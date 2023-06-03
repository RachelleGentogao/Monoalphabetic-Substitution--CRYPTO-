const input = document.getElementById('file');
const key = document.getElementById('key');

function fileInput(evt) {
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    document.getElementById('output').value = contents;
  };
  reader.readAsText(file);
}
input.addEventListener('change', fileInput, false);

   function encryptFile() {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const plaintext = e.target.result;
        const inputKey = parseInt(key.value);
        const ciphertext = encrypt(plaintext, inputKey);
        document.getElementById('output').value = ciphertext;
      };        
      reader.readAsText(file);
    }

    function decryptFile() {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const ciphertext = e.target.result;
        const inputKey = parseInt(key.value);
        const plaintext = decrypt(ciphertext, inputKey);
        document.getElementById('output').value = plaintext;
      };

      reader.readAsText(file);
    }

    function encrypt(plaintext, key) {
      plaintext = plaintext.toUpperCase();
      let ciphertext = '';

      for (let i = 0; i < plaintext.length; i++) {
        const char = plaintext[i];
        let substitution = char;
        if (char.match(/[A-Z0-9]/)) {
          let charCode;
          if (char.match(/[A-Z]/)) {
            charCode = char.charCodeAt(0) - 65;
            substitution = String.fromCharCode((charCode + key) % 26 + 65);
          } else if (char.match(/[0-9]/)) {
            charCode = char.charCodeAt(0) - 48;
            substitution = String.fromCharCode((charCode + key) % 10 + 48);
          }
        }
        ciphertext += substitution;
      }
      
      document.getElementById('download').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(ciphertext);
      document.getElementById('download').download = 'encrypted.txt';
      
      return ciphertext;
    }

    function decrypt(ciphertext, key) {
      ciphertext = ciphertext.toUpperCase();
      let plaintext = '';

      for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i];
        let reverseSubstitution = char;
        if (char.match(/[A-Z0-9]/)) {
          let charCode;
          if (char.match(/[A-Z]/)) {
            charCode = char.charCodeAt(0) - 65;
            reverseSubstitution = String.fromCharCode((charCode - key + 26) % 26 + 65);
          } else if (char.match(/[0-9]/)) {
            charCode = char.charCodeAt(0) - 48;
            reverseSubstitution = String.fromCharCode((charCode - key + 10) % 10 + 48);
          }
        }
        plaintext += reverseSubstitution;
    }
    return plaintext;
}
