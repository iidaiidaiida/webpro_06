const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

//判定を加えて，GitHubに加えて，そのURLを提出

app.get("/janken", (req, res) => {                         
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  win = 0;
  total = 0;

  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる

  let judgement = '';
  if( hand == 'グー' && cpu == 'チョキ'){
  judgement = '勝ち';
  win += 1;
  }
  else if( hand == 'パー' && cpu == 'グー' ){
  judgement = '勝ち';
  win += 1;
  }
  else if( hand == 'チョキ' && cpu == 'パー' ){
  judgement = '勝ち';
  win += 1;
  }
  else if( hand == cpu ){
    judgement = '引き分け';
  }
  else {
    judgement = '負け';
  }
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/prime_number", (req, res) => {                         
  let hand = req.query.hand;
  console.log( {hand});
  let cpu = '';
  
  if (hand <= 1){
    cpu = '素数ではありません';
  }
  if (hand % 2 === 0 && hand !=2){
    cpu = '素数ではありません';
  } else{
    cpu = '素数です';
    let i = 3;
    while (i <= Math.sqrt(hand)) {
      if (hand % i === 0){
        cpu = '素数ではありません';
        break;
      }
      i += 2;
    }
  }
  if (hand === 2) {
    cpu = '素数です';
  }
  const display = {
    your: hand,
    cpu: cpu,
  }
  res.render( 'prime_number', display );
});

app.get("/plus", (req, res) => {                         
  let hand = Number(req.query.hand);
  let hand1 = Number(req.query.hand1);
  console.log( {hand});
  let cpu = '';

  cpu = hand + hand1;
  
  const display = {
    your1:hand1,
    your: hand,
    cpu: cpu,
  }
  res.render( 'plus', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
