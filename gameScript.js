// room class
class Room {
    constructor (name, size, description, colour){
    this._name = name;
    this._size = size;
    this._desc = description;
    this._colour = colour;
    this._linkedRooms = {}
    this._character = "";
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
    get character() {
        return this._character;
    }
    set character(value){
        this._character = value;
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
const room1 = new Room ("Kitchen", "large", "no one's been here in a while. . north is the lounge, there's a bathroom to the east","grey and dirty. . the colour of misery");
const room2 = new Room ("Lounge", "huge", "someone trashed the place. . signs of a struggle? kitchen is to the south. .  there's a dark door to the west.. and more blood. . answers often lie behind every door. . maybe this is where the story ends?  ","filthy");
const room3 = new Room ("Bathroom", "tiny", "all the problems started. . or ended here. . the blood leads north, the kitchen is to the west","covered in blood");
const room4 = new Room ("Garage", "dirty", "it's never been cleaned, junk everywhere. .  The kitchen is to the East, it's not the most inviting of places..","covered in old posters. ");
const room5 = new Room ("bedroom", "cold", "someone came in through the window while they slept..  the lounge is to the west. . blood and drag marks lead from there.. bathroom to the south. .","pink. . the wallpaper is peeling.. underneath is old white paint. . flaking away. .");
const room6 = new Room ("cellar", "dark", "there's no way out of here, except the way you came in","wet. . ");

//Room1 links
room1.linkRoom ("north", room2);
room1.linkRoom ("east", room3);
room1.linkRoom ("west", room4);

//Room2 links
room2.linkRoom ("south", room1);
room2.linkRoom ("east", room5);
room2.linkRoom ("west", room6);

//Room3 links
room3.linkRoom ("west", room1);
room3.linkRoom ("north", room5);

//Room4 links
room4.linkRoom ("east", room1);

//Room5 links
room5.linkRoom ("south", room3);
room5.linkRoom ("west", room2);

//Room6 links
room6.linkRoom ("east", room2);

// display Room function
function displayRoominfo(room){
    text = room.describe()

    document.getElementById("roomid").innerHTML = text;
    
    document.getElementById("characterid").innerHTML = room.character.name;
    
    document.getElementById("convo").innerHTML = room.character.dialogue;

    //console.log(detMills.dialogue());

}

//character class
class Character {
    constructor (name, description, conversation, clue){
        this._name = name;
        this._description = description;
        this._conversation = conversation;
        this._clue = clue;
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
    get clue (){
        return this._clue;
    }
    talk () {
        return `${this._clue}`
    }
    dialogue () {
        return `${this._description},${this._conversation}`
    }
   
}

// Characters
    const detMills = new Character ("Detective Mills", "20 years on the force", "I've never seen anything like this.. . pure savagery. ", "I once caught a guy who did something similar. . pepper sprayed him in the face just a s he linged at me, he cried like a baby. . this couldn't be him. . he's doing life in Rykers right now. . this could be the work of a copycat. ");
    const detPaxton = new Character("Detective Paxton", "experience these things don't have happy endings..", "notice there's no footprints leaving the scene?.. the killer could still be inside.", "Keep a weapon handy. .  There are parts of this house that haven't been searched yet. ."); 

// Character locations
    room1.character = detPaxton;
    room2.character = detMills;

// begin Game & Navigate function
function beginGame (){
    currentRoom = room4;
    displayRoominfo(currentRoom);

    document.addEventListener("keydown",function(event) {
        if (event.key === "Enter"){
            let command = document.getElementById("userinput").value.toLowerCase();
            const directions = ["north", "east", "west", "south"]
            //const commands = ["talk","take","search"]
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

