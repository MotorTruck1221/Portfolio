---
title: "Making an NGINX config for BYOD (Bring Your Own Domain)"
description: "Why and how I made an NGINX config for BYOD"
---

# Making an NGINX config for BYOD (Bring Your Own Domain)
---

## What is BYOD?

BYOD or Bring your own domain is an idea or concept that allows a user to point their domain to a servers IP allowing them to use the website from said domain.

## The challenges

- The server needs to throw a 403 if the domain is not in the list or database.
- The server *must* generate a valid SSL certificate on the fly for the domain. Why? Because we don't want to have to manually generate certificates for every domain added.
- It must be semi-easy to implement into already existing configurations.

## But why?

I was asked if I had an idea of how to do it, and so I thought what the hell, let's give it a shot.
I don't mess with Nginx configurations that much, so I thought it would be a good learning experience.

## The solution

First, I should specify that this uses [OpenResty](https://openresty.org/en/) which is a bundle of Nginx and LuaJIT. This is allows us to use Lua in our Nginx configuration.

```nginx
resolver 8.8.8.8 ipv6=off;
lua_shared_dict acme 16m;
lua_ssl_trusted_certificate /etc/ssl/certs/ca-certificates.crt;
lua_ssl_verify_depth 2;
init_by_lua_block {
    require("resty.acme.autossl").init({
        tos_accepted = true,
        account_key_path = "/etc/openresty/account.key",
        account_email = "youremail@yourdomain.com",
        domain_whitelist = nil,
        blocking = true,
        -- remove in production
        staging = true,
    })
}

init_worker_by_lua_block {
    require("resty.acme.autossl").init_worker()
}

server {
    #listen 80 default_server;
    #listen [::]:80 default_server;
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name yourmainserver.com;
    ssl_certificate /etc/openresty/default.pem;
    ssl_certificate_key /etc/openresty/default.key;
    ssl_certificate_by_lua_block {
        require("resty.acme.autossl").ssl_certificate()
    } 
    location / {
        access_by_lua_block {
            local res = ngx.location.capture("/domainCheck/?domain=" .. ngx.escape_uri(ngx.var.host))
            if res.status ~= 200 then
                ngx.log(ngx.WARN, "Domain not allowed: ", ngx.var.host)
                return ngx.exit(ngx.HTTP_FORBIDDEN)
            end
        }
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'Upgrade';
        proxy_connect_timeout 10;
        proxy_send_timeout 90;
        proxy_read_timeout 90;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
        proxy_temp_file_write_size 256k;
        proxy_pass http://localhost:9292; # Your actual website (ex: http://localhost:3000)
    }
    location /.well-known {
        access_by_lua_block {
            local res = ngx.location.capture("/domainCheck/?domain=" .. ngx.escape_uri(ngx.var.host))
            if res.status ~= 200 then
                ngx.log(ngx.WARN, "Domain not allowed: ", ngx.var.host)
                return ngx.exit(ngx.HTTP_FORBIDDEN)
            end
        }
        content_by_lua_block {
            require("resty.acme.autossl").serve_http_challenge()
        }
    }
    location /domainCheck {
        internal;
        proxy_pass http://localhost:9292/domainCheck;  # Adjust the URL if needed
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Explanation

This configuration is a bit complex, but I'll try to explain it as best as I can.

- The following directives were copied and pasted from the [lua-resty-acme repo](https://github.com/fffonion/lua-resty-acme)
    - resolver: This is the DNS resolver used to resolve the domain.
    - lua_shared_dict: This is used to store the certificates.
    - lua_ssl_trusted_certificate: This is used to verify the Let's Encrypt API.
    - lua_ssl_verify_depth: This is used to verify the Let's Encrypt API.

- The `init_by_lua_block` is used to initialize the Let's Encrypt API. This is where you can set the email, domain whitelist, and other settings.
    - tos_accepted: This is used to accept the Let's Encrypt TOS.
    - account_key_path: This is the path to your account key.
    - account_email: This is the email used to register the account.
    - domain_whitelist: This is the list of domains that are allowed (set to nil as we will check this in the `location /` block).
    - blocking: This is used to block the request until the certificate is generated. This could be set to false, but I felt like it was better to immediatley use the generated SSL certificate instead of using the fallbacks.
    - staging: This is used to use the Let's Encrypt staging API. This is useful for testing and should be removed in production.

- The `init_worker_by_lua_block` is used to initialize the worker. This is where the certificate is generated.

- The `server` block is where the actual server configuration is. This is where the domain is checked and the ACME http challenge is served.
    - The `listen` directives are used to listen on port 443 and 80.
    - The `server_name` directive is used to specify the main server name.
    - The `ssl_certificate` and `ssl_certificate_key` directives are used to specify the default certificate and key. This is used to serve the default certificate until the certificate is generated.
    - The `ssl_certificate_by_lua_block` is used to generate the SSL certificate.
    - The `location /` block is used to check if the domain is allowed. If it is not, it will return a 403.
        - The `access_by_lua_block` is used to check if the domain is allowed.
          1. We first capture the response from the `/domainCheck` location.
          2. If the status is not 200, we log a warning and return a 403.
    - The `location /domainCheck` block is used to check if the domain is allowed.
        - The `internal` directive is used to prevent direct access to the location.
        - The `proxy_pass` directive is used to pass the request to our actual http server that verifies the domain against a database or list. If it is allowed, it sends a 200 status code.
        - The `proxy_set_header` directives are used to set the headers.
    - The `location /.well-known` block is used to serve the ACME http challenge.
        - We also check if the domain is allowed here as to not spam the Let's Encrypt API.
        - The `content_by_lua_block` is used to serve the ACME http challenge.

## How I figured it out

I first started with the config provided by the [TitaniumNetwork Docs](https://docs.titaniumnetwork.org/guides/nginx).
Then I started looking at how to get the domain from the request and how to check if it was allowed. 
I was using normal NGINX, but I soon realized that I needed to use Lua to get the domain and check if it was allowed.
I then found the [lua-resty-auto-ssl repo](https://github.com/auto-ssl/lua-resty-auto-ssl/) but noticed it was unmaintained and kept searching.
Then I found the [lua-resty-acme repo](https://github.com/fffonion/lua-resty-acme) and started using that.
The rest was trial and error with a shit ton of Googling.

## Final thoughts 

This was a rather fun challenge, allowing me to learn crap tons of stuff about how NGINX and OpenResty works all while having fun doing so.
The repo providing a Discord bot, http server, database and this config is located [here](https://github.com/ruby-network/byod-bot)

## Credits:

- [TitaniumNetwork Docs](https://docs.titaniumnetwork.org) for the base config.
- The [lua resty acme repo](https://github.com/fffonion/lua-resty-acme) for the auto ssl stuff.
- [On Demand TLS feature by Caddy](https://caddyserver.com/docs/automatic-https#on-demand-tls), which was an inspiration for this project.
