(function () {
  if (document.scrollingElement) {
    return
  }
  var element = null
  function scrollingElement () {
    if (element) {
      return element
    } else if (document.body.scrollTop) {
      // speed up if scrollTop > 0
      return (element = document.body)
    }
    var iframe = document.createElement('iframe')
    iframe.style.height = '1px'
    document.documentElement.appendChild(iframe)
    var doc = iframe.contentWindow.document
    doc.write('<!DOCTYPE html><div style="height:9999em">x</div>')
    doc.close()
    var isCompliant = doc.documentElement.scrollHeight > doc.body.scrollHeight
    iframe.parentNode.removeChild(iframe)
    return (element = isCompliant ? document.documentElement : document.body)
  }
  Object.defineProperty(document, 'scrollingElement', {
    get: scrollingElement
  })
})();
(function() {
  var ModalHelper = (function(bodyCls) {
    var scrollTop;
    return {
      afterOpen: function() {
        scrollTop = document.scrollingElement.scrollTop;
        document.body.classList.add(bodyCls);
        document.body.style.top = -scrollTop + 'px';
      },
      beforeClose: function() {
        document.body.classList.remove(bodyCls);
        document.scrollingElement.scrollTop = scrollTop;
      }
    };
  })('modal-open');

  function openModal() {
    ModalHelper.afterOpen();
    $('.letter').show();
  }
  function closeModal() {
    ModalHelper.beforeClose();
    $('.letter').hide();
  }
  $('.more-modal').click(function(){
    openModal();
  });
  $('.modal-hide,.baoming-con li,.jz-btn').click(function(){
    closeModal();
  });
})();
