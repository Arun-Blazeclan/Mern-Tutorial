"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function Product() {
  _classCallCheck(this, Product);

  this.ProductId = 0;
  this.ProductName = '';
  this.CategoryName = '';
  this.Manufacturers = '';
  this.Price = 0;
};

var Constants = function Constants() {
  _classCallCheck(this, Constants);

  this.Categories = ['ECT', 'ECL', 'FOD', 'FSN'];
  this.Manufacturers = ['IBM', 'TATA', 'HP', 'Bajaj'];
};

var ProductLogic = /*#__PURE__*/function () {
  function ProductLogic() {
    _classCallCheck(this, ProductLogic);

    this.Products = [{
      ProductId: 1,
      ProductName: 'Laptop',
      CategoryName: 'ECT',
      Manufacturers: 'HP',
      Price: 100000
    }, {
      ProductId: 2,
      ProductName: 'TV',
      CategoryName: 'ECT',
      Manufacturers: 'Bajaj',
      Price: 40000
    }];
  }

  _createClass(ProductLogic, [{
    key: "getProducts",
    value: function getProducts(product) {
      return this.Products;
    }
  }, {
    key: "validateProduct",
    value: function validateProduct(val) {
      var errors = [];
      var regex = /\d/;

      for (var i = 0; i < headers.length; i++) {
        if (headers[i] == "ProductName") {
          if (val[i] == '') errors.push("Enter Name");else if (regex.test(val[i])) errors.push("Name should not contain number");
        } else if (headers[i] == "CategoryName") {
          if (val[i] == '') errors.push("Select Category");
        } else if (headers[i] == "Manufacturers") {
          if (val[i] == '') errors.push("Select Manufacturer");
        } else if (headers[i] == "Price") {
          if (val[i] == '') errors.push("Enter Price");else if (val[i] < 0) errors.push("Enter valid Price");
        }
      }

      return errors;
    }
  }, {
    key: "registerNewProduct",
    value: function registerNewProduct(head) {
      var ob = new Product();
      ob.ProductId = P_id;
      P_id += 1;
      var pname = document.getElementById("ProductName").value;
      if (pname.length > 0) pname = pname[0].toUpperCase() + pname.substring(1);
      ob.ProductName = pname;
      ob.CategoryName = document.getElementById("CategoryName").value;
      ob.Manufacturers = document.getElementById("Manufacturers").value;
      ob.Price = document.getElementById("Price").value;
      var val = Object.values(ob);

      if (this.validateProduct(val).length == 0) {
        return prodObj.Products.push(ob);
      } else {
        alert(this.validateProduct(val));
        return 0;
      }
    }
  }, {
    key: "updateProduct",
    value: function updateProduct(pid) {
      var _this = this;

      var _loop = function _loop(i) {
        if (_this.Products[i].ProductId === pid) {
          document.getElementById("ProductId").value = _this.Products[i].ProductId;
          document.getElementById("ProductName").value = _this.Products[i].ProductName;
          document.getElementById("CategoryName").value = _this.Products[i].CategoryName;
          document.getElementById("Manufacturers").value = _this.Products[i].Manufacturers;
          document.getElementById("Price").value = _this.Products[i].Price;
          document.getElementById("btnsub").style.display = "none";
          document.getElementById("create").style.display = 'block';
          document.getElementById("reg").style.display = 'block';
          document.getElementById('update').innerHTML = "<input type='button' id='btnupdate' value='Update'>";
          document.getElementById("btnupdate").addEventListener('click', function () {
            var pname = document.getElementById("ProductName").value;
            pname = pname[0].toUpperCase() + pname.substring(1);
            _this.Products[i].ProductName = pname;
            _this.Products[i].CategoryName = document.getElementById("CategoryName").value;
            _this.Products[i].Manufacturers = document.getElementById("Manufacturers").value;
            _this.Products[i].Price = document.getElementById("Price").value;
            var val = Object.values(_this.Products[i]);

            if (_this.validateProduct(val).length == 0) {
              document.getElementById("create").style.display = 'none';
              document.getElementById("status").innerText = "Data updated successfully...";
              clearInput();
              showTable();
            } else {
              alert(_this.validateProduct(val));
              return 0;
            }
          }, false);
        }
      };

      // search for Product, if found update and return an array with updated properuct
      // if product is not found then return error message 'ProductNot FOund'
      for (var i in this.Products) {
        _loop(i);
      }
    }
  }, {
    key: "deleteProduct",
    value: function deleteProduct(pid) {
      for (var i in this.Products) {
        if (this.Products[i].ProductId === pid) {
          delete this.Products[i];
        }
      }

      document.getElementById("status").innerText = "Data Deleted Succesfully...";
      showTable();
    }
  }, {
    key: "searchProduct",
    value: function searchProduct(criteria) {
      var _this2 = this;

      // e.g. criteria will be CategoryName=='ECT', then return all product for ECT
      // if criteria is undefined then return all reoducts
      //here fil is property selected by dropdown
      var fil = document.getElementById(criteria.id).value;
      document.getElementById("msg").innerText = "Enter ".concat(fil, " :- ");
      document.getElementById("filterbox").innerHTML = "<input type='text' id='searchbox'>";
      document.getElementById("btn").innerHTML = "<input type='button' value='Search' id='btnsearch'>";
      document.getElementById("btnsearch").addEventListener('click', function () {
        var val = document.getElementById("searchbox").value;
        filter(fil, val);
      }, false);

      var filter = function filter(head, attVal) {
        var filteredData = [];

        _this2.getProducts().map(function (item) {
          if (typeof item[head] == "string") {
            if (item[head].toLowerCase() == attVal.toLowerCase()) filteredData.push(item);
          } else if (item[head] == attVal.toLowerCase()) filteredData.push(item);
        });

        if (filteredData.length == 0) //showTable();
          document.getElementById("showTable").innerText = "No Record Found";else document.getElementById('showTable').innerHTML = generateHeading() + generateBody(filteredData);
      };
    }
  }, {
    key: "showProductGroup",
    value: function showProductGroup(groupKey) {// return all product by groupKey
    }
  }]);

  return ProductLogic;
}(); //take headers from class


var headers = Object.keys(new Product());
var P_id = 3; //make obj of product logic class

var prodObj = new ProductLogic(); //load on window

window.onload = function () {
  document.getElementById('cname').innerHTML = dropDown(new Constants().Categories, "CategoryName");
  document.getElementById('manu').innerHTML = dropDown(new Constants().Manufacturers, "Manufacturers");
  document.getElementById("dropdown").innerHTML = dropDown(headers, "group", 1);
  document.getElementById("create").style.display = 'none';
  showTable();
  document.getElementById("btnregister").addEventListener('click', function () {
    document.getElementById("ProductId").value = P_id;
    document.getElementById("create").style.display = 'block';
    document.getElementById("reg").style.display = 'none';
    document.getElementById("btnsub").style.display = 'block';
    document.getElementById("btnupdate").style.display = "none";
    clearInput();
  }, false);
  document.getElementById("btnsub").addEventListener('click', function () {
    if (prodObj.registerNewProduct(headers) == 0) {
      P_id -= 1;
    } else {
      document.getElementById("create").style.display = 'none';
      document.getElementById("reg").style.display = 'block';
      document.getElementById("status").innerText = "Register Successfully....";
      clearInput();
      showTable();
    }
  }, false);
}; //Generate Drop-Down


var dropDown = function dropDown(option, id) {
  var f = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var temp = '';

  if (f == 1) {
    temp = "<select id = '".concat(id, "' onchange = 'prodObj.searchProduct(").concat(id, ")' required><option value =''>--Select--</option>");
  } else {
    temp = "<select id='".concat(id, "' class='data'><option value =''>--Select--</option>");
  }

  option.forEach(function (unit) {
    temp += "<option value='".concat(unit, "'>").concat(unit, "</option>");
  });
  temp += "</select>";
  return temp;
}; //Generate Heading of dynamic table


var generateHeading = function generateHeading() {
  var headHTML = "<tr>";

  for (var i in headers) {
    headHTML += "<th>" + headers[i] + "</th>";
  }

  headHTML += "<th>Edit</th><th>Delete</th></tr>";
  headHTML += "</tr>";
  return headHTML;
}; //Generate body of table


var generateBody = function generateBody(DataVal) {
  var bodyHTML = "";

  for (var ind in DataVal) {
    var rowHTML = "<tr>";

    for (var ind2 in headers) {
      rowHTML += "<td id ='entry" + ind + headers[ind2] + "'>" + DataVal[ind][headers[ind2]] + "</td>";
    }

    rowHTML += "<td><button onclick = 'prodObj.updateProduct(" + prodObj.Products[ind].ProductId + ")'>Edit</button></td>";
    rowHTML += "<td><button onclick = 'prodObj.deleteProduct(" + prodObj.Products[ind].ProductId + ")'>Delete</button></td></tr>";
    bodyHTML += rowHTML;
  }

  return bodyHTML;
}; //Print Table


var showTable = function showTable() {
  document.getElementById('showTable').innerHTML = generateHeading() + generateBody(prodObj.getProducts());
}; //clear input fields


var clearInput = function clearInput() {
  var field = document.getElementsByClassName("data");
  document.getElementById("ProductId").value = P_id;

  for (var i = 0; i < field.length; i++) {
    field[i].value = '';
  }
};
