import cryptoJs from "crypto-js";

function Losts() {
    const posts = {
      docs: [],
    };
    for (let i = 0; i < 50; i++) {
      const image = `https://picsum.photos/id/${i}/200/200`;
      const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const views = Math.floor(Math.random() * 10000);
      const title = `${letter}${i}`;
      //caculate chance of like and download based on the view count
      const chanceOfLike = Math.floor(Math.random() * views);
      const chanceOfDownload = Math.floor(Math.random() * views);
      const likes = Math.floor(0.3 * Math.random() * chanceOfLike);
      const downloads = Math.floor(0.7 * Math.random() * chanceOfDownload);
      posts.docs.push({
        id: i,
        title,
        image: image,
        likes,
        downloads,
        views,
      });
    }
    // pick a random chance of how likey a post is to be liked or downloaded and push it to the array
  
    //sort the array by the number of likes
    posts.docs.sort(
      (a, b) =>
        0.15 * (b.likes / b.views - a.likes / a.views) +
        0.55 * (b.downloads / b.views - a.downloads / a.views) +
        0.1 * (b.views - a.views) +
        0.2 * Math.random()
    );
  
    return posts;
  }
function decrypt(data, key) {
    return cryptoJs.AES.decrypt(data, key).toString(cryptoJs.enc.Utf8);
}
function encrypt(data, key) {
    return cryptoJs.AES.encrypt(data, key).toString();
}
export {
    decrypt,
    encrypt
}