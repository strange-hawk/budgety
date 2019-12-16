// BUDGET CONTROLLER
var budgetController= (function () {

        var Expense = function(id,description,value){
            this.id = id
            this.description=description
            this.value = value
            this.percentage = -1
        }
        Expense.prototype.calcPercentage = function(totalIncome){
            if(totalIncome>0)
                this.percentage = Math.round((this.value/totalIncome)* 100)
            else
            this.percentage = -1
        }

        Expense.prototype.getPercentage= function(){
    return this.percentage            
        }
        
        var Income = function(id,description,value){
            this.id = id
            this.description=description
            this.value = value
        }

        var allExpenses=[]
        var allIncomes=[]
        var totalExpenses=[]
        var ID = 0
        // if(data.allitems[type].length>0){
        //     ID = data.allitems[type][data.allitems[type].length-1].id+1
        // }

        var calcuateTotal = function(type){
            var sum = 0
            if(type=='exp'){
                for(var i=0;i<data.allitems.exp.length;i++)
                    sum+=parseInt( data.allitems.exp[i].value)
            data.totals.exp = sum
            }
            if(type=='inc'){
                for(var i=0;i<data.allitems.inc.length;i++)
                    sum+=parseInt(data.allitems.inc[i].value)
                data.totals.inc = sum
            }
            // console.log(type+' '+sum)
            
            
            
        }
        var data = {
            allitems : {
                exp :[],
                inc : []
            },
            totals : {
                exp : 0,
                inc : 0
            },
            budget:0,
            percentage:-1

        }
        var budget=0

        return {
            addItem : function(type,des,val){
                var newItem
                // ID = data.allitems[type][data.allitems[type].length].id
                // create new item based on 'exp or 'inc
                if(type === 'exp')
                    {
                        if(data.allitems.exp.length>0){
                            ID = data.allitems.exp[data.allitems.exp.length-1].id+1
                        }
                        else{
                            ID=0
                        }
                        newItem = new Expense(ID,des,val)
                        data.allitems.exp.push(newItem)}
                else
                    {
                        if(data.allitems.inc.length>0){
                            ID = data.allitems.inc[data.allitems.inc.length-1].id+1
                        }
                        else{
                            ID=0
                        }
                        newItem = new Income(ID,des,val)
                        data.allitems.inc.push(newItem)}

                // push it into our data structure
                // data.allitems.type.push(newItem)
                ID++

    
                return newItem
            },
            display : function(){
                // console.clear()
                // console.log(data.allitems.exp[0])
                // console.log(data.allitems.inc[0])
                console.log(data)
                // console.log(data.allitems.inc)
            },

            deleteItem : function(type,id){
                var ids,index
                // id = 6
                // data.allitems[type][id]
                // [1 2 4 6 8 ]
                // index= 3
                if(type === 'inc')
                ids = data.allitems.inc.map(function(current){
                    return current.id
                })
                else{
                ids = data.allitems.exc.map(function(current){
                    return current.id
                })   
                }
                console.log(ids)

                index = ids.indexOf(id)
                if(index!== -1){
                    if(type === 'inc')
                    data.allitems.inc.splice(index,1)
                    else
                    data.allitems.exc.splice(index,1)
                }

            },

            calculateBudget: function(){
                // calculate total income and expenses
                calcuateTotal('exp')
                calcuateTotal('inc')
                // calcuate income and expenses
                data.budget = data.totals.inc - data.totals.exp

                // calculate the % of income that we spent
                if (data.totals.inc > 0)
                data.percentage = Math.round((data.totals.exp/data.totals.inc)*100)
            },
            getBudget: function(){
                return {
                    budget: data.budget,
                    totalInc : data.totals.inc,
                    totalExp : data.totals.exp,
                    percentage : data.percentage
                }
            },
            calcuatePercentage : function(){
                data.allitems.exp.forEach(function(cur){cur.calcPercentage(data.totals.inc)}
                    // cur.calcPercentage()
                )
            },

            getPercentage : function(){
                var allPerc = data.allitems.exp.map(function(cur){
                    return cur.getPercentage()
                })
                return allPerc
            }
        }


    
        
    
})()
// console.log('helloworld')





// UI CONTROLLER
var UIController = (function(){
    var DOMstring={
        inputType: '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputButton : '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel:'.budget__income--value',
        expenseLabel:'.budget__expenses--value',
        percentageLabel : '.budget__expenses--percentage',
        container:'.container',
        expensesPercLabel : '.item__percentage',
    }

    var formatNumber = function(num,type){
        var numsplit,int,dec,sign
        num = Math.abs(num)
        num = num.toFixed(2)
        numsplit = num.split('.')
        int = numsplit[0]
        if(int.length > 3){
            int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3)
        }
        dec = numsplit[1]
        

        return (type==='exp' ? '-' :'+') +" "+int +"."+ dec
        
    }


    // Some code
    return {
        getInput: function(){
            return {
                type : document.querySelector(DOMstring.inputType).value, // either income or expense
                description :document.querySelector(DOMstring.inputDescription).value,
                value : document.querySelector(DOMstring.inputValue).value
            }

        },
        addListIem: function(obj,type){
            var html,newhtml,element
            // HTML string with placeholder text
            if(type ==='inc'){
                element = DOMstring.incomeContainer
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'}
            else if(type==='exp'){
                element = DOMstring.expenseContainer
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'}
            // replace the placeholder text with actual data

            newhtml = html.replace('%id%',obj.id)
            newhtml = newhtml.replace('%description%',obj.description)
            newhtml = newhtml.replace('%value%',formatNumber(obj.value,type))
            
            // insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml)


        },


        deleteListItem: function(selectorID){
        document.getElementById(selectorID).parentNode.removeChild(document.getElementById(selectorID))
        },



        clearField : function(){
            var fields,fieldArray
            fields = document.querySelectorAll(DOMstring.inputDescription+','+DOMstring.inputValue)
            fieldArray = Array.prototype.slice.call(fields)
            fieldArray.forEach(function(current,index,array){
                current.value = ""

            });
            fieldArray[0].focus()
        },
        displayBudget : function(obj){
            document.querySelector(DOMstring.budgetLabel).textContent = formatNumber(obj.budget,obj.budget>0?'inc':'exp')
            document.querySelector(DOMstring.incomeLabel).textContent = formatNumber(obj.totalInc,'inc')
            document.querySelector(DOMstring.expenseLabel).textContent = formatNumber(obj.totalExp,'exp')
            obj.percentage>0 ? (document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage+'%') : document.querySelector(DOMstring.percentageLabel).textContent = "---"
            // document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage
        },
        getDOMstring : function(){
            return DOMstring
        },


        // changedType: function(){
        //     var fields = document.querySelectorAll(
        //     DOMstring.inputType+","+DOMstring.inputDescription+','+DOMstring.inputValue
        //     )
            
        // },



        displayPercentages : function(percentages){
            var fields = document.querySelectorAll(DOMstring.expensesPercLabel)
            var nodeListForEach = function(list,callback){
                for(var i=0;i<list.length;i++){
                    callback(list[i],i)
                }
            }

            nodeListForEach(fields, function(current,index){
                if(percentages[index]>0)
                    current.textContent = percentages[index]+'%'
                else
                    current.textContent = '---'
            })
        },

        displayMonth : function(){
            var month = ['January','February','March','April','May','June','July','August','September','October','November','December']
            var now = new Date()
            document.querySelector('.budget__title--month').textContent = month[now.getMonth()]+' '+now.getFullYear()
        }

        
    }
})()




// GLOBAL APP CONTROLLER
var controller = (function(BudgetCtrl,UICtrl){

        var eventListener = function(){
        var DOM = UIController.getDOMstring()
        document.querySelector(DOM.inputButton).addEventListener('click',ctrlAdditem)
        document.addEventListener("keypress",function(event){
            if(event.keyCode===13 || event.which===13){
                // document.querySelectorAll()
                // console.log('hellowolrd')
                ctrlAdditem()
            }
        })
            
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem)
        // document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changedType)
        }


        var updatePercentage = function(){
            // / calculate percentage
            BudgetCtrl.calcuatePercentage()

            // read percentage from budget controller
            var percentages = BudgetCtrl.getPercentage()

            // update the UI with new controller
            UICtrl.displayPercentages(percentages)
        }


        var ctrlAdditem = function(){

        var input,newItem
        // get the field input data
        input = UIController.getInput()
        // console.log(input)

        if(input.description!== "" && !isNaN(input.value) && input.value > 0)
        {
        // add the data to the budget controller
        newItem = BudgetCtrl.addItem(input.type, input.description,input.value)

        // add new item to user interface 
            UICtrl.addListIem(newItem,input.type)

        //  clear the fields
        UICtrl.clearField()
        
        // calculate and update budget 
        updateBudget()

        // calculate and update percentage
        updatePercentage()

        }
        }


        var ctrlDeleteItem = function(event){
            var itemID,splitID,type,ID
            itemID = event.target.parentNode.parentNode.parentNode.parentNode.id
            if(itemID){
                // inc-1
                splitID = itemID.split('-')
                type= splitID[0]
                ID = parseInt(splitID[1])
                console.log(ID)
                // delete teh item from data structure
                BudgetCtrl.deleteItem(type,parseInt(ID))

                // delete from UI
                UICtrl.deleteListItem(itemID)
                // update and show the result
                updateBudget()
                // update percentage
                updatePercentage()
            }

        }





        var updateBudget = function(){
        
            // calculate budget
            BudgetCtrl.calculateBudget()
    
            // return budget
            var budget = budgetController.getBudget()
            // display budget 
            UICtrl.displayBudget(budget)
                }

        return {
            init: function(){
                console.log('application started')
                UICtrl.displayBudget(budgetController.getBudget())
                UICtrl.displayMonth()
                eventListener()
            }
        }

    
})(budgetController,UIController)

controller.init()

