class Room {
    constructor (name, size, description, colour){
    this._name = name;
    this._size = size;
    this._desc = description;
    this._colour = colour;
    this._linkedRooms = {}
}
    get name () {
        return this._name;
    }
    get size () {
        return this._size;
    }
    get desc () {
        return this._desc;
    }
    get colour () {
        return this._colour;
    }
    describe (){
        return `You're in the ${this._name}, it's a ${this._size} room, the walls are ${this._colour}. . it looks like ${this._desc}`
    }
    linkRoom (direction,roomToLink){
        this._linkedRooms[direction] = roomToLink;
    }
    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        }else{
            alert("you can't move in that direction");
            return this;
        }
    }
}

//Rooms

const room1 = new Room ("Kitchen", "large", "no one's been here in a while. . north is the lounge, there's blood trails to the east","grey and dirty. . the colour of misery");
const room2 = new Room ("Lounge", "huge", "someone trashed the place. . signs of a struggle? kitchen is to the south. .  there's a dark door to the west..","filthy");
const room3 = new Room ("Bathroom", "tiny", "all the problems started. . or ended here. . the bedroom is to the north","covered in blood");
const room4 = new Room ("Garage", "dirty", "it's never been cleaned, junk everywhere. .  The kitchen is to the East, it's not the most inviting of places..","covered in old posters. ");
const room5 = new Room ("bedroom", "cold", "someone came in through the window here while they slept..  the lounge is to the west, bathroom to the south. . blood leads to the bathroom. .","pink. . the wallpaper is peeling.. underneath is old white paint. . flaking away. .");
const room6 = new Room ("cellar", "dark", "there's no way out of here, except the way you came in","wet. . ");

//Room1 links

room1.linkRoom ("north", room2);
room1.linkRoom ("east", room3);
room1.linkRoom ("west", room4);

console.log(room1._linkedRooms);

//Room2 links

room2.linkRoom ("south", room1);
room2.linkRoom ("east", room5);
room2.linkRoom ("west", room6);

console.log(room2._linkedRooms);

//Room3 links

room3.linkRoom ("west", room1);
room3.linkRoom ("north", room5);

console.log(room3._linkedRooms);

//Room4 links

room4.linkRoom ("east", room1);

console.log(room4._linkedRooms);

//Room5 links

room5.linkRoom ("south", room3);
room5.linkRoom ("west", room2);

console.log(room5._linkedRooms);

//Room6 links

room6.linkRoom ("east", room2);

console.log(room6._linkedRooms);

//console.log (room1.move("north"));
//console.log (room1.move("south"));


function displayRoominfo(room){
    text = room.describe()

    document.getElementById("roomid").innerHTML = text;

}

function beginGame (){
    currentRoom = room4;
    displayRoominfo(currentRoom);

    document.addEventListener("keydown",function(event) {
        if (event.key === "Enter"){
            let command = document.getElementById("userinput").value.toLowerCase();
            const directions = ["north", "east", "west", "south"]
            if (directions.includes(command)){
                currentRoom = currentRoom.move(command)
                displayRoominfo(currentRoom);
                document.getElementById("userinput").value ="";
            }else{
                document.getElementById("roomid").value =""
                alert("You can't go in that direction");
                document.getElementById("userinput").value ="";
            }
        }
    });
}

beginGame()

class Character {
    constructor (name, description, conversation){
        this._name = name;
        this._description = description;
        this._conversation = conversation;
    }
    get name () {
        return this._name;
    }
    get description () {
        return this._description;
    }
    get conversation () {
        return this._conversation;
    }
    talk () {
        return `${this._conversation}`
    }
    describe () {
        return `Hi I'm ${this._name}. .  I'm ${this._description}, ${this._conversation}`
    }
}