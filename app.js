'use strict';

// Api https://gist.github.com/bertez/8e62741154903c35edb3bfb825a7f052
const timeLineList = document.querySelector('#timelineList');
const searchBar = document.querySelector('#searchBar');
let data = [];

// Search
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value;
  const filterTimeline = data.filter((item) => {
    return (
      item.date.toString().toLowerCase().includes(searchString) ||
      item.title.toLowerCase().includes(searchString)
    );
  });
  displayTimeline(filterTimeline);
});

// Fetch data
const loadTimeline = async () => {
  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/bertez/8e62741154903c35edb3bfb825a7f052/raw/b5cd5137fd168116cc71740f1fbb75819d0fa82e/zelda-timeline.json'
    );
    data = await response.json();
    data.sort((a, b) => {
      return a.date - b.date;
    });
    displayTimeline(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// Display data
const displayTimeline = (timeLine) => {
  const htmlString = timeLine
    .map((item) => {
      return `
    <li class="timeline-item">
    <div>
      <time>${item.date}</time>
        <h2>${item.title}</h2>
        <img src="${item.image}" alt="image">
      <p>${item.text}</p>
      </p>
  </div>
  </li>`;
    })
    .join('');
  timeLineList.innerHTML = htmlString;
  // effect animation
  const items = document.querySelectorAll('li');
  function isItemInView(item) {
    const rect = item.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  function callbackFunc() {
    for (let i = 0; i < items.length; i++) {
      if (isItemInView(items[i])) {
        console.log(items[i]);
        items[i].classList.add('show');
      }
    }
  }
  window.addEventListener('load', callbackFunc);
  window.addEventListener('resize', callbackFunc);
  window.addEventListener('scroll', callbackFunc);
};
loadTimeline();
