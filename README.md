Steps to recreate this base set up

Github Link: https://github.com/Magellanarts/Jumpline 

Repo Link: https://github.com/Magellanarts/Jumpline.git The Repo link can be found by clicking the green 'Clone or download' button at the Github link


1.	Open Terminal. Navigate to where you want your files to be.
⁃	A shortcut: In Terminal, type ‘cd ‘ (note the space after cd). Then drag the folder from finder into Terminal. This should copy the path to that folder into Terminal for you. Then just hit enter to have Terminal go to that folder.

2.	Run 'git clone https://github.com/Magellanarts/Jumpline.git'.
⁃	This will pull down the repo.

3.	Run 'npm install'.
⁃	This will download all the dependencies for you.

4.	Use MAMP to point a folder to the 'site' folder. This is where all your code from dev gets compiled and copied to.
⁃	On the hosts tab, click the + near the bottom left of the screen and type the name your local site in the Server name field on the right. (jumpline.localhost)
⁃	Click the folder icon below the Document root label and navigate to the ‘site’ folder inside the repo you copied down earlier.

5.	Run ‘grunt watch’ to have grunt watch for changes in your dev folder.
