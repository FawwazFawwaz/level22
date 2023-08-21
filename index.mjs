fetch('https://directus-fawwas-alfarisi-kj.cloud.programmercepat.com/items/news')
  .then(response => response.json())
  .then(data => {
    console.log(data.data);
    const newsList = document.getElementById("newsList");

    data.data.forEach(news => {
      const newsContent = document.createElement("div");
      newsContent.classList.add("newsContent");

      const title = document.createElement("h2");
      title.textContent = news.title;

      const image = document.createElement("img");
      image.src = news.img_url;

      const desc = news.desc.split('\n');

      const description = document.createElement("div");
      description.classList.add("description");

      for (let i = 0; i < desc.length; i++) {
        const paragraph = document.createElement("p");
        paragraph.textContent = desc[i];
        description.appendChild(paragraph);
      }

      const writerAndDate = document.createElement("div");
      writerAndDate.classList.add("writerAndDate");

      const writer = document.createElement("p");
      writer.classList.add("writer");
      writer.textContent = news.writer

      const date = document.createElement("p");
      date.classList.add("date");

      if (news.date_updated >= 1) {
        const updateDate = news.updated;
        date.textContent = updateDate;
      } else {
        const createDate = news.date_created;
        date.textContent = createDate;
      }

      const hr = document.createElement("hr");

      newsContent.appendChild(title);
      newsContent.appendChild(writerAndDate);
      writerAndDate.appendChild(date);
      writerAndDate.appendChild(writer);
      newsContent.appendChild(image);
      newsContent.appendChild(description);
      newsContent.appendChild(hr);
      newsList.appendChild(newsContent);



        const updateFormDropdown = document.getElementById('news-id-update');
        updateFormDropdown.innerHTML = '<option value="" disabled selected>Select News ID</option>';
        data.data.forEach(news => {
        const option = document.createElement('option');
        option.value = news.id;
        option.textContent = news.id;
        updateFormDropdown.appendChild(option);
        });


        document.getElementById('update-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const newsId = document.getElementById('news-id-update').value;
        const title = document.getElementById('news-title-update').value;
        const description = document.getElementById('news-description-update').value;
        const image = document.getElementById('news-image-update').value;
        const writer = document.getElementById('news-writer-update').value;


        const data = {
        title: title,
        desc: description,
        img_url: image,
        writer: writer
        };

        fetch(`https://directus-fawwas-alfarisi-kj.cloud.programmercepat.com/items/news/${newsId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            console.log('Response:', responseData)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })
});
})
.catch(error => {
  console.error('Error:', error);
});