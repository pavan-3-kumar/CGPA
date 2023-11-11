const express = require('express')
const app = express();
let  port = process.env.PORT || 4000;
const path = require('path');
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

app.use(express.urlencoded());// middle ware

app.get('/' , function(req , res){
   // to select a year and semester
   res.render('home' );
});

let credits = [[[3, 3, 3, 3, 1.5, 1.5, 3, 1.5], [3, 3, 3, 3, 2, 1.5, 1, 1.5, 1.5]], [[3, 3, 3, 3, 3, 1.5, 1.5, 1.5, 2], [3, 3, 3, 3, 3, 1.5, 1.5, 1.5, 2]], [[3, 3, 3, 3, 3, 1.5, 1.5, 1.5, 2], [3, 3, 3, 3, 3, 1.5, 1.5, 1.5, 2]], [[3, 3, 3, 3, 3, 3, 3, 2], [12]]];
let subjects = [[['M1', 'EP', 'BEEE', 'PPS', 'EP LAB', 'BEEE LAB', 'EG LAB', 'PPS LAB'], ['M2', 'EC', 'DE', 'ECS', 'PP', 'EC LAB', 'PP LAB', 'CEW', 'ECS LAB']], [['P&S', 'DMS', 'CO', 'DS', 'OOP', 'P&S LAB', 'DS LAB', 'OOP LAB', 'SOC'], ['CS', 'DBMS', 'OS', 'SE', 'WT', 'CS LAB', 'DBMS LAB', 'WT LAB', 'SOC']], [['AFL', 'CN', 'DAA', 'PE-1', 'OE-1', 'DAA LAB', 'DA LAB', 'SUM INTERN', 'SOC'], ['AI', 'CNS', 'ML', 'PE-2', 'OE-2', 'AI LAB', 'ML LAB', 'TERM PAPER', 'SOC']], [['HSS', 'PE-3', 'PE-4', 'PE-5', 'OE-3', 'OE-4', 'INTERN', 'SOC'], ['PROJECT/INTERN']]];
let grades={'A+':10,'A':9,'B':8,'C':7,'D':6,'E':5};
let year  , sem ; 
app.post('/details', function(req , res)
{
   // retriveing the selected year and semester data 
   const op1 = req.body.year;
   const op2 = req.body.sem;
       year = parseInt(op1);
    sem = parseInt(op2);
    // now taking the information of points that they have got in those subjects of that sem
      res.render('grades',{option1 :subjects[year][sem] , option2:credits[year][sem] ,grades});
});

app.post('/result' , function(req , res)
{
   // calculating the sgpa 
   let total = 0 ,sum =0 ;
   const sub = subjects[year][sem];
   // taking all the data of the form i.e all the subjects points
   // this is an object 
   var pa = req.body;
   let i=0 ; 
   for(const [subj, gpa] of Object.entries(pa))
   {
       total += gpa*credits[year][sem][i];
       sum += credits[year][sem][i];
       i++;
   }
   total /= sum;
   total = Math.round(total * 100)/100;
   // console.log(total);
   // showing the result
   res.render('print_res' , {result:total});
   // res.redirect('/');
});
app.listen(port , function(err)
{
   if(err){console.log("there is an error");return ;}
   console.log("server started");
   return ; 
});

// git commit -m "initial commit"
// git push origin main