'use strict';

// Api https://gist.github.com/bertez/8e62741154903c35edb3bfb825a7f052

async function getEvents() {
  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/bertez/8e62741154903c35edb3bfb825a7f052/raw/b5cd5137fd168116cc71740f1fbb75819d0fa82e/zelda-timeline.json'
    );
    const data = await response.json();
    // ordenarlos en el tiempo
    data.sort((a, b) => {
      return a.date - b.date;
    });
    // type it to the DOM
    data.forEach((event) => {
      const eventElement = document.createElement('li');
      eventElement.innerHTML = `<div>
      <time>${event.date}</time>
        <h1>${event.title}</h1>
        <img src="${event.image}" alt="image">
      <p>${event.text}</p>
      </p>
  </div>`;
      return document.querySelector('ul').appendChild(eventElement);
    });
    const items = document.querySelectorAll('li');
    function isItemInView(item) {
      const rect = item.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    function callbackFunc() {
      for (let i = 0; i < items.length; i++) {
        if (isItemInView(items[i])) {
          items[i].classList.add('show');
        }
      }
    }
    window.addEventListener('load', callbackFunc);
    window.addEventListener('resize', callbackFunc);
    window.addEventListener('scroll', callbackFunc);
  } catch (error) {
    console.log(error);
  }
}
getEvents();

console.log(data);

// listen for events
