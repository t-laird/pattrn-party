const selectTab = (event) => {
  if (window.innerWidth > 500) {
    return selectTabDesktop(event);
  } else {
    return selectTabMobile(event);
  }
};

const selectTabDesktop = (event) => {
  if ($(event.target).hasClass('active')) { return; }
  const tabNumber = $(event.target).attr('tabNum');
  $('.accordian__tab__selection').removeClass('active');
  $('.accordian__box__content').addClass('hidden');
  $(`.accordian__tab__selection${tabNumber}`).addClass('active');
  $('.accordian__expand__collapse').addClass('plus');

  setTimeout(() => {
    $('.accordian__box__content').addClass('hidden');
    $(`.accordian__box__content${tabNumber}`).removeClass('hidden');
    $(`.accordian__tab__selection${tabNumber}`).find('.accordian__expand__collapse').removeClass('plus');
    $(`.accordian__tab__selection${tabNumber}`).find('.accordian__expand__collapse').addClass('minus');
  }, 1000);
};

const selectTabMobile = (event) => {
  const currentlyClosed = !!$(event.target).find('.plus').length;
  const tabNumber = $(event.target).attr('tabNum');
  const expandSymbol = $(event.target).find('.accordian__expand__collapse');

  if (currentlyClosed) {
    $(`.accordian__box__content${tabNumber}`).removeClass('hidden');
    $(`.accordian__tab__selection${tabNumber}`).addClass('active');
    
    expandSymbol.addClass('minus');
    expandSymbol.removeClass('plus');
  } else {
    $(`.accordian__box__content${tabNumber}`).addClass('hidden');
    $(`.accordian__tab__selection${tabNumber}`).removeClass('active');
    
    expandSymbol.removeClass('minus');
    expandSymbol.addClass('plus'); 
  }
};

const showHideCode = (event) => {
  const show = $(event.target).text() === 'VIEW CODE';
  const newText = show ? 'HIDE CODE' : 'VIEW CODE';
  $(event.target).text(newText);

  const associatedCode = $(event.target).siblings('.codeContainer');
  
  associatedCode.toggleClass('show');
};

const changeCode = (event) => {
  const codeTarget = $(event.target).attr('codeType');
  const codeGists = {
    html: '#gist86413720', 
    css: '#gist86414015', 
    javascript: '#gist86414030'
  };

  $('.codeContainer li').removeClass('selected');
  $(event.target).addClass('selected');

  $('.gist').hide();
  $(codeGists[codeTarget]).show();
};

$('.accordian__tab__selection').on('click', selectTab);
$('.accordian__button').on('click', showHideCode);
$('.codeContainer li').on('click', changeCode);