/* ============ Function ============*/
// setObject LocalStorage
Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
  return JSON.parse(this.getItem(key));
}
function localSaveObject(key, obj) {
  if (localStorage.getItem(key)) 
    localStorage.removeItem(key);
  localStorage.setObject(key, obj);
}

function localSaveItem(key, value) {
  if (localStorage.getItem(key)) 
    localStorage.removeItem(key);
  localStorage.setItem(key, value);
}
/* ============ Function ============*/


/* ============ Toggle Menu Tab ============*/
$('#collapseListGroupHeadingVN').click(() => {
  $('#collapseListGroupVN').collapse('toggle');
});
$('#collapseListGroupHeadingNXB').click(() => {
  $('#collapseListGroupNXB').collapse('toggle');
});
$('#collapseListGroupHeadingTG').click(() => {
  $('#collapseListGroupTG').collapse('toggle');
});
/* ============ Toggle Menu Tab ============*/


// Handle list group item
$('#menu-list').on('click', '.list-group-item' , e => {
  const title = e.currentTarget.firstElementChild.firstChild.nodeValue;
  localSaveItem('titleList', title);
});

$('#main-content').on('click', '.thumbnail > img', e => {
  
  // const _this = e.currentTarget
  // const image = _this.children[0].attributes[0].nodeValue;
  // const title = _this.children[1].children[0].innerText;
  // const price = _this.children[1].children[1].firstElementChild.innerText;
  // const sales = _this.children[1].children[2].firstElementChild.innerText;
  // const book = { title, image, price, sales };

  // if (localStorage.getItem('book')) 
  //   localStorage.removeItem('book');
  // localStorage.setObject('book', book);
  window.location.href = '/book';
});

// Shopping cart button
$(document).on('click', '#btn-shopping-cart' , e => {
  window.location.href = '/shopping-cart';
});

//Handle account btn
$('#btn-account').click(e => {
  const name = localStorage.getItem('account') || '';
  if (!name) return $('#myModelLogin').modal('show');
  $('#toggle-account').text(name);
  window.location.href = '/account';
});


/* ============ Handle Login - Logout ============*/
$('#btn-signin').click(e => {
  e.preventDefault();
  const email = $('#inputEmailLogin').val();
  const password = $('#inputPasswordLogin').val();
  $.post('/signin', {email, password}, data => {
    if(!data.success) return swal("Loi!", "Sai email hay password", "error");
    localStorage.setItem('account', 'Trần Trung Tính');
    window.location.href = '/account';
  });
  // console.log({email, password});
});
$('#btn-logout').click(e => {
  e.preventDefault();
  const name = localStorage.getItem('account') || '';
  if(!name) return;
  swal({
    title: "Đăng xuất?",
    text: "Đăng xuất khỏi tài khoản " + name,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then(yes => {
    if(yes) {
      localStorage.removeItem('account');
      window.location.href = '/'
    }
  });
});
/* ============ Handle Login - Logout ============*/