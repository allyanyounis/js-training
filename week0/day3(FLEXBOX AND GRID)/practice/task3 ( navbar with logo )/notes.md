Flexbox notes

Justify-content:
Controls how items are placed along the main axis.
If flex-direction: row, it controls horizontal positioning.
If flex-direction: column, it controls vertical positioning.
Value	                 Function
flex-start	            Default. Items stay at the start
flex-end	              Items move to the end
center	               Items move to the center
space-between	         First item at start, last at end, equal space between items
space-around	           Equal space around each item; edges get smaller space
space-evenly	       Equal space everywhere, including edges


FLEX DIRECTION :
row	Default. Items go left → right
row-reverse	Items go right → left
column	Items go top → bottom
column-reverse	Items go bottom → top


justify-content = main axis
align-items = cross axis


Align-items:
align-items is used to control items on the cross axis.
Simple rule:
justify-content = main axis
align-items = cross axis
If:
flex-direction: row;
then:
- main axis = horizontal
- cross axis = vertical
So:
align-items: center;
moves items vertically to the center.
If:
flex-direction: column;
then:
- main axis = vertical
- cross axis = horizontal
So:
align-items: center;
moves items horizontally to the center.

align-items: flex-start;  → moves items to the top
align-items: flex-end;    → moves items to the bottom
align-items: center;      → moves items to the center
align-items: baseline;    → moves items according to their text baseline
align-items: stretch;     → moves items across the cross axis if their size is not fixed



ORDER :

The CSS order property controls the visual order of flex items inside a flex container.
By default, every flex item has:
order: 0;

Example:
<div class="container">
  <div class="a">A</div>
  <div class="b">B</div>
  <div class="c">C</div>
</div>

.container {
  display: flex;
}

.a {
  order: 2;
}

.b {
  order: 1;
}

.c {
  order: 3;
}

Visual result:
B   A   C



Align-self:
- align-self: flex-start; → one item at start
- align-self: center; → one item in center
- align-self: flex-end; → one item at end
- align-self: stretch; → stretch one item
- align-self: auto; → follows parent's align-items
Easy rule:
align-items = all children
align-self = one child


flex-wrap:
flex-wrap property, which accepts the following values:
nowrap: Every item is fit to a single line.
wrap: Items wrap around to additional lines.
wrap-reverse: Items wrap around to additional lines in reverse.