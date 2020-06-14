function getStories(url) {
  return fetch(url, {
      method: 'get'
    })
    .then(res => res.json())
    .catch(err => console.log(err));
}

document.addEventListener('DOMContentLoaded', () => {
  let dropdowns = document.querySelectorAll('.dropdown-trigger');
  let modals = document.querySelectorAll('.modal');
  let search = document.getElementById('search-bar');
  M.Dropdown.init(dropdowns, {
    coverTrigger: false,
    hover: true
  });
  M.Modal.init(modals);
  getStories('/search')
    .then(stories => {
      let auto = M.Autocomplete.init(search, {
        data: stories.data,
        limit: 5,
        onAutocomplete: val => {
          $('#search-form').attr('action', '/author/' + stories.links[val].author_id + '/story/' + stories.links[val].story_id);
          $('#search-form').submit();
        }
      });
    });
});