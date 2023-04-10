const CHROME_SYNC_STORAGE_KEY = "ops-buddy-4633f243";

const componentKey = { qa_sites: "", prod_sites: "" };
const array = ["qa", "prod"]; // priority is more prod

const getStorage = (componentKey, callback) => {
  chrome.storage.sync.get([componentKey], function (result) {
    callback(result[componentKey]);
  });
};

function changeBackground(result) {
  var arr;
  array.forEach(function (env, index) {
    arr = result[env + "_sites"].split("\r\n|\n|\r").filter((e) => e);

    for (var i = 0; i < arr.length; i++) {
      console.log(i, window.location.origing);
      // TODO strip '/' http://localhost:8089/
      if (window.location.origin.match("^" + arr[i] + "$")) {
        console.log(
          "INFO:ops-buddy: matched env: " +
            env +
            " pattern: " +
            arr[i] +
            " url: " +
            window.location.hostname
        );
        const acc_color_map = new Map([
          ["dev", "#968a1b"],
          ["qa", "green"],
          ["prod", "red"],
        ]);
        color = acc_color_map.get(env);
        if (document.getElementsByClassName("page-header").length > 0)
          document.getElementsByClassName("page-header")[0].style.background =
            color;
        if (document.getElementsByClassName("jenkins-breadcrumbs").length > 0)
          document.getElementsByClassName(
            "jenkins-breadcrumbs"
          )[0].style.background = color;
        // if (document.getElementById('jenkins')!=null)   document.getElementById('jenkins').style.background='violet'
        // if (document.getElementsByTagName('body').length>0)  document.getElementsByTagName('body')[0].style.background='gray'
      }
    }
  });
}

window.onload = function () {
  getStorage(CHROME_SYNC_STORAGE_KEY, changeBackground);
};
