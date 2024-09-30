
const textarea = document.getElementById('chat-text-area');
/* textarea.addEventListener('input', function() {
  this.style.height = 'auto'; // Reset the height to auto
  const newHeight = this.scrollHeight; // Calculate the new height
  this.style.height = newHeight + 'px'; // Apply new height
  
  // Transform to expand upwards
  const offset = newHeight - this.offsetHeight;
  this.style.transform = `translateY(-${offset}px)`; // Adjust using translateY
}); */

textarea.addEventListener('input', function() {
  this.style.height = 'auto'; // Reset the height to auto
  this.style.height = this.scrollHeight + 'px'; // Set height based on scrollHeight

  // Adjust position to expand upwards
  const bottomOffset = window.innerHeight - (this.offsetTop + this.offsetHeight);
  this.style.bottom = `${bottomOffset}px`;
});