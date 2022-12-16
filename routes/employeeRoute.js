const express = require("express");
let Employee = require('../models/Employee');

const router = express.Router();

// Create new Employee
router.post("/", async (req, res)=>{

    let newEmployee = new Employee(req.body);
    
    await newEmployee.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err    
            })
        }
        return res.status(200).json({
            success:"Registation Success"
        });
    });
});

//get all employees
router.get("/", async(req, res) => {
    await Employee.find().exec((err, employees)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            allEmployeeees:employees
        });
    });
});

//another methord for get all emps
// router.get("/all", async(req, res)=>{
//     await Employee.find().then((employeesAll)=>{
//         res.json(employeesAll)
//     }).catch((err) => {
//         console.log(err);
//     });
// });

// get employee by id
router.get("/:empid", async(req, res) =>{

    let id = req.params.empid;

    await Employee.findById(id).exec((err, employee)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        if(!employee){
            return res.status(505).json({
                message:'Employee not Founded !'
            })
        }
        return res.status(200).json({
            success:true,
            employee:employee
        });
    });
});

//Update Employee
// router.put("/update:empid", async(req, res)=>{
//     let id = req.params.empid;
//     await Employee.findByIdAndUpdate(id, 
//         {
//             $set:req.body
//             },
//         (err,updateEmp)=>{
//             if(err){
//                 return res.status(400).json({
//                     error:err
//                 });
//             }
//             return res.status(200).json({
//                 success:true,
//                 Upemployee:updateEmp
//             });
//         }
//     );
// });

// router.put("/update:empid", async(req, res)=>{
//     let id = req.params.empid;

//     console.log("updaye" + id);

//     const {empName,empAge,empAddress,empPhone} = req.body

//     const empUpdate = {
//         empName,
//         empAge,
//         empAddress,
//         empPhone
//     }

//     await Employee.findByIdAndUpdate(id,empUpdate)
//     .then(()=>{
//         res.status(200).send({status: "updated"})
//     }).catch((err) => {
//         console.log(err);
//     })
// });

router.put("/update/:empid", async(req, res)=>{

    let empid= req.params.empid;

    await Employee.findByIdAndUpdate({_id:empid }, req.body)
//     .then(() => {
//         //console.log(employee);

//     //   if (!employee) {
//     //     return res.status(404).json({
//     //         message:'record not founded!'
//     //     });
//     //   }
//       return res.status(200).json({
//         message:'Update Successfull'
//       })
      
//     }).catch((err)=>{
//         error:err
//     })
// });
.then(() => {
    return res.status(200).json({
        message:'User Updated !'
    })
}).catch((err) => {
   // console.log(err);
    return res.status(404).json({
        error:err
    })
})
});

//delete Employee

// router.delete("/delete/:empid", async(req, res)=>{
    
//     //let delEmpId = req.params.empid;

//     await Employee.findOneAndDelete({delEmpId},(err, employee) => {

//         if(err){
//             return res.status(404).json({
//                 error:err  
//             })
//         }
//         if(!employee){
//             return res.status(505).json({
//                 message:'Employee is not recognized..!'
//             })
//         }
//         return res.status(202).json({
//             success:'Successfully Deleted'
//         })
//     });
// });

router.delete("/delete/:empid", async(req, res)=>{
    
    let delEmpId = req.params.empid;

    await Employee.findByIdAndDelete(delEmpId)
    .then(() => {
        return res.status(200).json({
            message:'User Deleted !'
        })
    }).catch((err) => {
        console.log(err);
        return res.status(404).json({
            error:err
        })
    })

});

module.exports = router;    