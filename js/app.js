function addMoviesToDOM(movies) {
  const movieContainer = document.querySelector('#movie-cards');
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';
  movies.forEach((movie) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h2');
    img.src = `${imgBaseUrl}/${movie.poster_path}`;
    img.alt = movie.title;
    img.classList.add('card__img');
    title.textContent = movie.title;
    title.classList.add('card__title');
    div.append(img, title);
    movieContainer.append(div);
  });
}

async function getMovies() {
  try {
    const loaderEl = document.querySelector('#loader');

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=9b623b1f7d35157306aec9237e067e76`
    );

    loaderEl.classList.add('show-loader');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const { results } = await response.json();
    loaderEl.classList.remove('show-loader');

    addMoviesToDOM(results);
  } catch (error) {}
}

function highlightCurrentMenuLink() {}

function init() {
  const currentPage = window.location.pathname;

  // pegar todos os links
  // para cada link, comparar se o href é igual a variavel currentpage
  const links = document.querySelectorAll('.nav__link');
  links.forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
  console.log(currentPage);

  switch (currentPage) {
    case '/index.html':
      getMovies();
      break;
    case '/shows.html':
      console.log('shows');
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
