'use strict';
let arrayTestFirst=[];
let arrayTestSecond=[];
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
  Gallery.prototype.filter = function(array){
    array.forEach((value) => {
      let imageFilter = $('select');
      imageFilter.append(`<option>${value}</option>`);
    });
  };
  const pageJson = () => {
    let gallery;
    $.ajax('data/page-1.json', { method: 'GET' ,dataType: 'JSON'}).then(page1 => {
      page1.forEach(function(value){
        gallery = new Gallery(value.image_url,value.title,value.description,value.keyword,value.horns);
        if(!(arrayTestFirst.includes(gallery.keyword))){
          arrayTestFirst.push(gallery.keyword);}
        gallery.render();
      });
      gallery.filter(arrayTestFirst);
    });
  };
  pageJson();

  $('#button1').on('click',function(){
    $('section').remove();
    $('select option').remove();
    pageJson();
  });
  const page2Json = () => {
    let gallery;
    $.ajax('data/page-2.json', { method: 'GET' ,dataType: 'JSON'}).then(page2 => {
      page2.forEach(function(value){
        gallery = new Gallery(value.image_url,value.title,value.description,value.keyword,value.horns);
        if(!(arrayTestSecond.includes(gallery.keyword))){
          arrayTestSecond.push(gallery.keyword);}
        gallery.render();
      });
      gallery.filter(arrayTestSecond);
    });
  };
  $('#button2').on('click',function(){
    $('section').remove();
    $('select option').remove();
    page2Json();
  });
});

$('select').change(function(){
  var selected = $(this).children('option:selected').val();
  $('section').hide();
  $(`.${selected}`).show();
});
