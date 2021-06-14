//Create variables here
var dog, dogimg, happydogimg;
var foodStock, foodS;
var database;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload() {
  //load images here
  happydogimg = loadImage("images/happy dog.png");
  dogimg = loadImage("images/Dog.png");
}

function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  dog = createSprite(700, 300);
  dog.addImage("dog", dogimg);
  dog.scale = 0.2;

  feed = createButton("Feed the dog");
  feed.position(680, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  foodStock = database.ref('Food');
  foodStock.on("value", function (data) {
    foodS = data.val();
  })
  foodObj = new Food();
}

//function to update food stock and last fed time 
function feedDog() {
  dog.addImage("dog", happydogimg);
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    hour: hour()
  })
  dog.scale += 0.01

  if (foodS === 0) {
    feed.mousePressed()
  }else{
    feed.mousePressed(feedDog)
  }
}
//function to add food in story' 
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}




function draw() {
  background(46, 139, 87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  fill("black");
  textSize(30);

  drawSprites();
  //add styles here

  foodObj.display();
  fill(255, 255, 254);
  textSize(20);
  if (lastFed >= 12) {
    text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }

}

