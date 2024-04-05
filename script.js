// script.js

const apiKey = "15c0631cbf0944628c720107e96c64c0";
const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`; // Limit to 10 articles for better performance
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        return data.articles || []; // Return an empty array if articles are not available
    } catch (error) {
        console.error("Error fetching random news:", error.message);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by query", error)
        }
    }
})

 async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`; // Limit to 10 articles for better performance
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        return data.articles || []; // Return an empty array if articles are not available
    } catch (error) {
        console.error("Error fetching random news:", error.message);
        return [];
    }
}

function createBlogCard(article) {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = article.urlToImage || "placeholder.jpg"; // Use placeholder image if urlToImage is not available
    img.alt = article.title;
    img.classList.add("blog-image"); // Add class for styling

    const title = document.createElement("h2");
    //title.textContent = article.title;
    const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + "...." : article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    const truncatedDes = article.description.length > 120 ? article.description.slice(0,120) + "...." : article.description;
    description.textContent = truncatedDes;
    description.textContent = article.description || "No description available"; // Provide default text if description is not available

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });

    return blogCard;
}

function displayBlogs(articles) {
    blogContainer.innerHTML = ""; // Clear previous content
    articles.forEach((article) => {
        const blogCard = createBlogCard(article);
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying blogs:", error.message);
    }
})();
