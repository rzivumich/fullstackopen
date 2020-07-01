const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const reducer = (sum, item) =>{
        return sum + item
    }

    return blogs.length === 0
    ? 0
    : blogs.reduce((a, b) => a + (b["likes"] || 0), 0)
}

const favoriteBlog = (blogs) => {
  var favorite = {
    title: "Title",
    author: "Fav",
    likes: -1
  }

  for (var i=0; i < blogs.length; ++i){
    if(blogs[i].likes > favorite.likes){
      favorite.likes = blogs[i].likes
      favorite.title = blogs[i].title
      favorite.author = blogs[i].author
    }
  }

  return blogs.length === 0
  ? 0
  : favorite
}

const mostBlogs = (blogs) => {
  var authors = [
    {author: "test", blogs: -1}
  ]

  for(var i=0; i < blogs.length; ++i){
    var exist = 0
    for(var j=0; j < authors.length; ++j){
      if(blogs[i].author === authors[j].author){
        authors[j].blogs += 1
        exist = 1
      }
    }
    if(exist === 0){
      authors.push({author: blogs[i].author, blogs: 1})
    }
  }

  var mostWritten = {author: "Temp", blogs: -1}

  for(var i=0; i < authors.length; ++i){
    if(authors[i].blogs > mostWritten.blogs){
      mostWritten.author = authors[i].author
      mostWritten.blogs = authors[i].blogs
    }
  }

  return blogs.length === 0
  ? 0
  : mostWritten
}

const mostLikes = (blogs) => {
  var authors = [
    {author: "test", likes: -1}
  ]

  for(var i=0; i < blogs.length; ++i){
    var exist = 0
    for(var j=0; j < authors.length; ++j){
      if(blogs[i].author === authors[j].author){
        authors[j].likes += blogs[i].likes
        exist = 1
      }
    }
    if(exist === 0){
      authors.push({author: blogs[i].author, likes: blogs[i].likes})
    }
  }

  var mostLiked = {author: "Temp", likes: -1}

  for(var i=0; i < authors.length; ++i){
    if(authors[i].likes > mostLiked.likes){
      mostLiked.author = authors[i].author
      mostLiked.likes = authors[i].likes
    }
  }

  return blogs.length === 0
  ? 0
  : mostLiked
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}