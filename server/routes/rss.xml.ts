import { serverQueryContent } from "#content/server";
import RSS from 'rss';
const baseURL = 'http://motortruck1221.com';

export default defineEventHandler(async (event) => {
    const feed = new RSS({
        title: 'MotorTruck1221',
        site_url: baseURL,
        feed_url: `${baseURL}/rss.xml`,
    });
    const docs = await serverQueryContent(event).sort({ date: -1 }).where({ _partial: false }).find();
    docs.map((doc) => {
        feed.item({
            title: doc.title ?? '-',
            url: `${baseURL}${doc._path}`,
            date: doc.date ?? new Date().toUTCString(),
            description: doc.description ?? 'No description'
        });
    });
    setHeader(event, 'content-type', 'text/xml');
    return feed.xml({ indent: true });
})
