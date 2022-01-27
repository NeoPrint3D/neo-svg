

//create a list of fake posts
function Posts() {
    const posts = {
        "docs": []
    }
    for (let i = 0; i < 10; i++) {
        //grab a random image from unsplash
        const image = `https://source.unsplash.com/random/400x200?sig=${i}`
        posts.docs.push({
            id: i,
            title: `Post ${i}`,
            description: `This is post ${i}`,
            file: image

        })
    }
    return posts
}

export default Posts




