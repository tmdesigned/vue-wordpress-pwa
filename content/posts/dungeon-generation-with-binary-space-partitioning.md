---
title: "Dungeon Generation with Binary Space Partitioning"
slug: "dungeon-generation-with-binary-space-partitioning"
date: "2018-08-22"
excerpt: "Old 80's games like Rogue and Adventure saw players exploring top-down dungeons, moving from room to room, fighting monsters, and collecting treasure. The games were brutally hard, and I'm not the only one who felt the difficulty made you w"
image: "/img/uploads/2018/09/Screen-Shot-2018-09-22-at-4.42.28-AM.jpg"
tags:
  - "JavaScript"
draft: false
---
Old 80's games like Rogue and Adventure saw players exploring top-down dungeons, moving from room to room, fighting monsters, and collecting treasure. The games were brutally hard, and I'm not the only one who felt the difficulty made you want to play them all the more. "I'm better than this game, damnit!"

Rogue and Adventure were different and led to many spinoffs, with Rogue itself lending its name to a genre of what are now called Roguelike games. These games are turnlike in that each player move triggers the next 'tick' in the game (progressing the game one step, allowing all the monsters to move, etc.) They featured permadeath, meaning there were no save points or extra lives. And they used procedurally generated maps, meaning the levels were never the same twice.

The map generation is awesome. There are a lot of approaches to generating a map, most of which feature recursion, but the most common is called a Binary Space Partion. It's a little tricky the first time you hear it, but is also beautifully simple. I wish I could have been there when those early 80's game designers were figuring out how to apply these mathematical concepts to their unorthodox cause of programming kickass games.

## Binary Space Partition

The method results in a 2d map of rooms linked together with passages. None of the rooms should overlap, and there should be at least one passage into each room.

Let's say you were going to draw out your map in sand with a long stick.

1.  You mark out the outer boundary of the map as a rectangle.
2.  Randomly, you draw out a line to divide it into 2 sections (doesn't matter if horizontally or vertically)
3.  Randomly, you divide each of those 2 sections.
4.  Randomly, you divide each of those 4 sections

...and so on until you have a bunch of random little rectangles. These are not your dungeon rooms. They are the maximum possible borders for each of the rooms' walls. Now you take your shovel and carve out the actual rooms within those borders.

1.  Randomly, you take your stick and draw a smaller complete rectangle inside each room border.
2.  Now you take your shovel and dig out each actual room.

We now how have a bunch of separated little rectangles. Any kid knows the next step is to dig tunnels between them. Randomly? That could work, but you might end up with some left-out rooms. We can do better than that.

As we were dividing the map, making it smaller and smaller, we were basically creatin

1.  Entire Map
    1.  Huge Area A  
        1.  Big Area A
            1.  Medium Area A
                1.  Small Area A
                2.  Small Area B
            2.  Medium Area B
                1.  Small Area A
                2.  Small Area B
        2.  Big Area B
            1.  Medium Area A
                1.  Small Area A
                2.  Small Area B
            2.  Medium Area B
                1.  Small Area A
                2.  Small Area B
    2.  Huge Area B
        1.  Big Area A
            1.  Medium Area A
                1.  Small Area A
                2.  Small Area B
            2.  Medium Area B
                1.  Small Area A
                2.  Small Area B
        2.  Big Area B
            1.  Medium Area A
                1.  Small Area A
                2.  Small Area B
            2.  Medium Area B
                1.  Small Area A
                2.  Small Area B

In other words, we have recursively **partitioned** out our **spaces** by dividing it into 2's (**binary**). A binary space partitioning. Within each of those Small Areas, we've now carved out an actual Room. To connect the rooms, we work our wayÂ _back upÂ_ the hierarchy, connecting each "sibling" with a random passage.Â 

1.  Dig out a tunnel between a room in each Small Area A and Small Area B
2.  Dig out a tunnel between a room in each Medium Area A and Medium Area B
3.  Dig out a tunnel between a room in each Big Area A and Big Area B
4.  Dig out a tunnel between a room in each Huge Area A and Huge Area B

And..that's it! There's now a network of rooms and passages.Â 

## Coding out a BSP Dungeon

After you get the concept, coding it out is the real challenge. There is a lot of abstract geometry math to do, and humans think more linearly than recursively.

I found it supremely helpful to do the abstract map generation with Object Oriented Programming, generally separately from any game logic or display. My MapNode class represents a conceptual area and it's inner room, holds all of it's children nodes, and is aware of what other nodes it has connections to. This makes it easier to traverse down and up the hierarchy without losing your place, and it would be very easy to extend with further helper functions.

\[code language="JavaScript"\] export class MapNode{ constructor( x1, y1, x2, y2, parent ){ this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2; this.innerX1; this.innerY1; this.innerX2; this.innerY2; this.children = \[\]; this.connections = \[\]; this.parent = parent; } } //Carve out an inner room MapNode.prototype.carveInner = function( minRoomDimension ){ let deltaY = this.y2 - this.y1; let deltaX = this.x2 - this.x1; if ( deltaY < minRoomDimension + 4 ){ this.innerY1 = this.y1; this.innerY2 = this.y2; }else{ this.innerY1 = randInt( this.y1, this.y1 + ( .3 \* deltaY ) ); this.innerY2 = randInt( this.y2 - ( .3 \* deltaY ), this.y2 ); } if ( deltaX < minRoomDimension + 4 ){ this.innerX1 = this.x1; this.innerX2 = this.x2; }else{ this.innerX1 = randInt( this.x1, this.x1 + ( .3 \* deltaX ) ); this.innerX2 = randInt( this.x2 - ( .3 \* deltaX ), this.x2 ); } } //Establish connection to siblings. We ask our parent who our siblings are. MapNode.prototype.connect = function(){ if( this.parent != null ){ let thisNode = this; let nodes = this.parent.children.filter( function(i){ //filter out this child, can't compare memory due to filter copy return !( i.x1 == thisNode.x1 && i.x2 == thisNode.x2 && i.y1 == thisNode.y1 && i.y2 == thisNode.y2 ); } ); this.connectToNodes( nodes ); } } //Establish a connection MapNode.prototype.connectToNodes = function( nodes ){ for( let node of nodes ){ if( !this.hasConnection( node ) ){ this.connections.push( node ); } } } //Is node connected to given node? MapNode.prototype.hasConnection = function( node ){ for( let connection of this.connections ){ if ( connection == node ){ return true; } } return false; } //Split this node into two smaller nodes (if there is room) MapNode.prototype.split = function( horizontal, minRoomDimension, current, max ){ horizontal = horizontal || false; minRoomDimension = minRoomDimension || 10; current = current || { number : 0 }; max = max || 25; let dim = horizontal ? 'x' : 'y'; let alt = horizontal ? 'y' : 'x'; let axis = randInt( this\[ dim + '1' \] + minRoomDimension, this\[ dim + '2' \] - minRoomDimension - 1 ); //split if enough room on either side (happens until limits overlap) if( this\[ dim + '1' \] + minRoomDimension <= axis && this\[ dim + '2' \] - minRoomDimension - 1 >= axis && current.number + 1 < max ){ //Can't use direct constructor as we don't know if primary dimension is x or y //This is also a little helpful for visualizing let first = new MapNode( null, null, null, null, this ); let second = new MapNode( null, null, null, null, this ); first\[ dim + '1' \] = this\[ dim + '1' \]; first\[ alt + '1' \] = this\[ alt + '1' \]; first\[ dim + '2' \] = axis; first\[ alt + '2' \] = this\[ alt + '2' \]; second\[ dim + '1' \] = axis + 1; second\[ alt + '1' \] = this\[ alt + '1' \]; second\[ dim + '2' \] = this\[ dim + '2' \]; second\[ alt + '2' \] = this\[ alt + '2' \]; this.children.push( first ); this.children.push( second ); current.number++; first.split( !horizontal, minRoomDimension, current, max ); second.split( !horizontal, minRoomDimension, current, max ); this.connect(); }else{ this.carveInner( minRoomDimension ); this.connect(); } } //I'm a sucker for little helper functions function randInt(min,max){ let r = Math.floor(Math.random()\*(max-min+1)+min); return r; }\[/code\]

### Splitting Rooms

This isn't terribly hard. You have to pick if each split is horizontal is vertical, and then pick where within the area's boundaries to draw the line. If there is going to be a minimum area size, you have to be that far away from the walls or you shouldn't split.

After splitting, you have two new areas, each of which also need to be split, so on and so on until you reach the minimum specified room size or the max number of rooms.Â 

Take a look in the split function above. It's basically doing what I just said -- choosing an orientation (not randomly here; instead the opposite of the node's parent's split direction), picking an axis position respecting the minimum room sizes given and the maximum number of rooms, and then splitting down to create two new nodes.

This leaves us with an abstract representation of our dungeon, but hasn't printed anything to the screen. Our game will need to use this class to set up the actual view, then tie in the game logic (rules, players, monsters, etc.) to interact with it. But as far as Binary Space Partitioning, this is it!
