document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.getElementById('phoneInput');
  const phoneForm = document.getElementById('phoneForm');
  const jsonURL = 'https://raw.githubusercontent.com/kjpvaibhav/Direct2Chat/refs/heads/main/countries_info.json';

  fetch(jsonURL)
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    const dropdown = document.getElementById('countrySelect');

    data.forEach(country => {
      if (country.name === "India") {
        return;
      }
      const option = document.createElement('option');
      option.value = country.name;
      option.textContent = `${country.flag} - ${country.name} - ${country.code} - ${country.dial_code}`;
      dropdown.appendChild(option);
    });
    $('.searchable').select2();
  })
  .catch(error => console.error('Error loading JSON:', error));

  // Handle form submission
  phoneForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedName = document.getElementById('countrySelect').value;
    const selectedCountryCode = jsonData.find(item => item.name === selectedName);
    if (selectedCountryCode) {
      const countryCode = selectedCountryCode.dial_code;
      const phoneNumber = phoneInput.value.replace(/\s+/g, '');  // Remove spaces
      
      if (phoneNumber) {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        const url = 'https://wa.me/';
        window.open(url+fullPhoneNumber, '_blank');
        alert(`Full Phone Number you have entered: ${fullPhoneNumber}`);
      } else {
        alert('Please enter a valid phone number.');
      }
    }
  });
});
