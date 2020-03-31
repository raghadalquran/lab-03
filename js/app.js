'use strict';
let arrayToPush=[];
$(document).ready(function(){
  function Gallery(image_url,title,description,keyword,horns){
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
  }
  Gallery.prototype.render = function() {
    let $galleryClone = $('#page-2').html();
    var rendered = Mustache.render($galleryClone , this);
    $('main').append(rendered);
    // let $galleryClone = $('#photo-template').clone();
    // $galleryClone.removeAttr('photo-template');
    // $galleryClone.find('img').attr('src',this.image_url);
    // $galleryClone.find('h2').text(this.title);
    // $galleryClone.find('p').text(this.description);
    // $galleryClone.attr('class',this.keyword);
    // $('main').append($galleryClone);
  };
  Gallery.prototype.render2 = function() {
    let $galleryClone = $('#page-2').html();
    var rendered = Mustache.render($galleryClone , this);
    $('main').append(rendered);
  };
  Gallery.prototype.filter = function(){
    let imageFilter = $('select');
    if(!(arrayToPush.includes(this.keyword))){
      arrayToPush.push(this.keyword);
      imageFilter.append(`<option>${this.keyword}</option>`);}
  };
  const pageJson = () => {
    $.ajax('data/page-1.json', { method: 'GET' ,dataType: 'JSON'}).then(page1 => {
      page1.forEach(function(value){
        let gallery = new Gallery(value.image_url,value.title,value.description,value.keyword,value.horns);
        gallery.filter();
        gallery.render();
      });
    });
  };
  pageJson();

  $('#button1').on('click',function(){
    $('section').remove();
    pageJson();
  });
  const page2Json = () => {
    $.ajax('data/page-2.json', { method: 'GET' ,dataType: 'JSON'}).then(page2 => {
      page2.forEach(function(value){
        let gallery = new Gallery(value.image_url,value.title,value.description,value.keyword,value.horns);
        gallery.filter();
        gallery.render2();
      });
    });
  };
  $('#button2').on('click',function(){
    $('section').remove();
    page2Json();
  });
});

$('select').change(function(){
  var selected = $(this).children('option:selected').val();
  arrayToPush.forEach(function(val){
    if(selected === val) {
      $('section').hide();
      $(`.${val}`).show();
      console.log(val);
    }

  });
});
