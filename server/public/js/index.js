// var socket = io.connect('http://localhost:3000');
$("ul.hud_castle > li").on("click", function () {
  if ($(this).attr("id") == "rank") {
    $("div#overlay").fadeIn(600);
    $("div#hud_modal_rank").fadeIn(1000);
  } else {
    $("div#overlay").fadeIn(600);
    $("div#hud_modal").fadeIn(1000);
  };
});

$("div.comfirm").on("click", function () {
  $("div#overlay").fadeOut(1000);
  $("div#hud_modal").fadeOut(600);
});

$("div.hud_mr_close").on("click", function () {
  $("div#overlay").fadeOut(1000);
  $("div#hud_modal_rank").fadeOut(600);
});

// function listener (event) {
//   console.log(event.type, event.pageX, event.pageY);
// }
//
// interact('.hud_action_menu')
//   .draggable({
//     inertia: true,
//     restrict: {
//       restriction: "body",
//       endOnly: true,
//       elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
//     },
//     autoScroll: true,
//     onmove: dragMoveListener,
//     onend: listener
//   });
//
//   function dragMoveListener (event) {
//     var target = event.target,
//         // keep the dragged position in the data-x/data-y attributes
//         x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
//         y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
//
//     // translate the element
//     target.style.webkitTransform =
//     target.style.transform =
//       'translate(' + x + 'px, ' + y + 'px)';
//
//     // update the posiion attributes
//     target.setAttribute('data-x', x);
//     target.setAttribute('data-y', y);
//   }
