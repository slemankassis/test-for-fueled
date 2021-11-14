# Test for Fueled

Just for let you know I did the other type questions too. I know, the instructions say only do the short answer type but I enjoyed the activity and I wanna the position and the visa :P

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## TODO

### Ask to UX for add a pen icon in the title of the questionnaire in order to improve UX and make the user know the text is editable

### Ask to UX fix contrast of some elements

https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html (See Evinced results)

### Look for the comments in the code starting with `TODO:` in comments

Use this extension for see the comments easier

_Name: Better Comments
Id: aaron-bond.better-comments
Description: Improve your code commenting by annotating with alert, informational, TODOs, and more!
Version: 2.1.0
Publisher: Aaron Bond
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments_

For example:
![image](https://user-images.githubusercontent.com/5224903/141675019-5f110ec5-ec27-4dd7-a001-4582cd2a3841.png)

### Fix dependabot alerts

![image](https://user-images.githubusercontent.com/5224903/141674859-9f318ab8-ced9-4b46-b877-9f69933dd6f8.png)

## A11y analisys and final results

### Axe devtools

https://www.deque.com/axe/devtools

![image](https://user-images.githubusercontent.com/5224903/141651324-839ecfb2-6237-4f6b-a6f5-686c8c28bcaf.png)

### Chrome Console Lighthouse

https://developers.google.com/web/tools/lighthouse

Added to the project root `Report a11y Lighthouse.html`

![image](https://user-images.githubusercontent.com/5224903/141651330-5bff26fa-89ef-4921-b217-8aafb52159ea.png)

### Evinced

https://www.evinced.com/

![image](https://user-images.githubusercontent.com/5224903/141651411-417a99b8-a478-4e37-8f4a-cb33fe7ee5d8.png)

![image](https://user-images.githubusercontent.com/5224903/141674789-6ea982ee-4d78-4cc0-91ef-d2bedb8366a9.png)

![image](https://user-images.githubusercontent.com/5224903/141652398-9c8c92a3-0385-4f6f-9e4b-3521ffa2ae77.png)

### Wave

https://wave.webaim.org/

![image](https://user-images.githubusercontent.com/5224903/141674818-7efda7a6-c47d-4632-bac4-38193b0931ab.png)

## Taken desitions

1. Differents elements for answers: `answer` for the 2 first type of questions and for the rest array `answers`.
2. Delete answer if we change to multiple answer question type and delete answers if we change to non multiple answer question. Don't delete answers if we keep the multiple answer question and don't delete answer if we keep the non multiple anwser question in order to improve UX.
3. Use of prettier, eslint (Airbnb guide https://github.com/airbnb/javascript) and markdownlint
4. Use of BEM for classnames http://getbem.com/naming/ in combination with clsx https://www.npmjs.com/package/clsx for define better classnames in the JSX
5. Use of yarn intead of npm for install packages npm and run the proyect, is faster and perform better https://www.section.io/engineering-education/npm-vs-yarn-which-one-to-choose/
6. Docu WCAG https://www.w3.org/TR/wai-aria-practices
7. Follow the scaffolding proposed by react-create-app
8. Use of TypeScript
9. Setup .npmrc for take the default rnpm registry
10. Setup .nvmrc for auto select of node version https://github.com/nvm-sh/nvm
11. Use of keycastr https://github.com/keycastr/keycastr

## Demos a11y

### https://www.loom.com/share/14c48366ac2d4c34b89adc42e4a305da

In the following demo we will observe the following:

1. Text size 16 and 32px

2. Zoom 400

3. Avoided horizontal scroll always

4. Wrap question title

5. Text spacing for the fonts

### https://www.loom.com/share/96a41e3f66d84cef8d55cd1570bf1e1a

In the following demo we will observe the following:

1. A11y tools

### https://www.loom.com/share/8c464d0eeb98438b9f70bb31a039aeec

In the following demo we will observe the following:

1. VoiceOver in MacOS Monterey

### (TODO)

1. NVDIA, JAWS

2. Test of the site in Android Emulator Chrome

#### Text spacing script

```javascript
javascript:(function(){ var style = document.createElement(%27style%27), styleContent = document.createTextNode(%27* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p{ margin-bottom: 2em !important; } %27); style.appendChild(styleContent ); document.getElementsByTagName(%27head%27)[0].appendChild(style); var iframes = document.querySelectorAll(%27iframe%27);for (var i=0; i<iframes.length; i++) {try{iframes[i].contentWindow.document.getElementsByTagName(%27head%27)[0].appendChild(style); } catch(error) { console.log(%27Bookmarklet error: %27+error)}}})();
```
