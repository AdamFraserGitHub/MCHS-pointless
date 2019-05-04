echo "installing packages neccesary for MCHS-pointless"

echo "installing node.js (this may take a while)"
sudo apt-get install nodejs
echo "intall of node.js complete!"
echo "installing node package manager (this also may take a while)"
sudo apt-get install npm
echo "install of npm complete!"

echo "installing neccesary npm packages"
sudo npm install express
sudo npm install socket.io
sudo npm install ip
echo "neccesary npm packages installed!"
