var strSiteName = document.getElementById("name");
var strURL = document.getElementById("url");
var strSites = localStorage.getItem("allSites");
var arrSites = [];

if (strSites) {
  arrSites = JSON.parse(strSites);
  getSites(arrSites);
}

function setSite() {

  var objSite = { 
    siteName: strSiteName.value,
    siteURL: strURL.value
  };

  arrSites.push(objSite);
  localStorage.setItem("allSites", JSON.stringify(arrSites));

  getSites(arrSites);
  clearForm();
}

function getSites(arrSites) {
  strProduct = "";
  for (var i = 0; i < arrSites.length; i++) {
    strProduct += `
    <tr>
      <td><h5>${arrSites[i].siteName}</h5></td>
      <td style="width: 50px;"><a name="" id="" class="btn btn-primary" href="${arrSites[i].siteURL}" target="_blank" role="button">Visit</a></td>
      <td style="width: 50px;"><button class="btn btn-danger d-inline" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = strProduct;
}

function deleteProduct(intIndex) {
  arrSites.splice(intIndex,1);
  localStorage.setItem("allSites",JSON.stringify(arrSites));
  getSites(arrSites);
}

function clearForm() {
  strSiteName.value = '';
  strURL.value = '';
}

function checkValidation() {
  // http,https empty
  if (strSiteName.value == "") {
    document.getElementById('name').classList.add('is-invalid');
  } else if (strURL.value == "") {
    document.getElementById('url').classList.add('is-invalid');
  } else {
    if(!strURL.value.startsWith("http://") || !strURL.value.startsWith("https://")) {
      strURL.value = "https://" + strURL.value;
    }
    setSite();
  }
}