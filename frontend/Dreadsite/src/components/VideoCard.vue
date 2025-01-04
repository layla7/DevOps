<template>
<div class="container mt-5">
    <div class="d-flex justify-content-center">
        <a href="#" class="video-card">
            <div class = "p-2">
                <img src="https://placehold.co/600x400" alt="Video Thumbnail">
                <div class="h3">Sample Video Title</div>
            </div>
        </a>
    </div>
</div>
</template>

<style scoped>
.video-card {
    width: 100%;
    border-radius: 8px;
    max-width: 320px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease;
}
.video-card img {
    border-radius: 8px;
    width: 100%;
}

.video-card:hover {
    background-color: #f4f4f4;
}
</style>
