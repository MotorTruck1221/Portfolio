let songs: any = null;
let lastFetch: any = null;

async function fetchRecentSong(url: string, user: string, key: string) {
    const twelveHours = 12 * 60 * 60 * 1200
    if (lastFetch === null || (new Date() as any  - lastFetch) > twelveHours) {
        const song: any = await $fetch(`${url}?method=user.getrecenttracks&user=${user}&api_key=${key}&format=json&limit=1`);
        lastFetch = new Date(); 
        return songs = song;
    }
    else {
        return songs;
    }
}

export default defineEventHandler(async (event) => {
    const { lastFMURL, lastFMUser, lastFMKey } = useRuntimeConfig(event);
    const songs = await fetchRecentSong(lastFMURL, lastFMUser, lastFMKey);
    try {
        const artist = songs.recenttracks.track[0].artist['#text'];
        const name = songs.recenttracks.track[0].name;
        const smallImage = songs.recenttracks.track[0].image[0]['#text']
        const mediumImage = songs.recenttracks.track[0].image[1]['#text']
        const largeImage = songs.recenttracks.track[0].image[2]['#text']
        const xlImage = songs.recenttracks.track[0].image[3]['#text']
        const now = new Date();
        const diffMs = now as any - lastFetch;
        const minutesElapsed = Math.floor(diffMs / (1000 * 60));
        const hoursElapsed = Math.floor(minutesElapsed / 60);
        const jsonResp = {
            artist: artist,
            name: name,
            images: {
                small: smallImage,
                medium: mediumImage,
                large: largeImage,
                xl: xlImage
            },
            lastFetch: minutesElapsed < 60 ? `${minutesElapsed} minute${minutesElapsed !== 1 ? 's' : ''}` : `${hoursElapsed} hour${hoursElapsed !== 1 ? 's' : ''}`
        }
        setResponseStatus(event, 200);
        return jsonResp
    } catch (err: any) {
        setResponseStatus(event, 500);
        return JSON.stringify({error: "Something went terribly wrong!"})
    }
})
