# mvcct-templates
mvcct-templates installs content files needed by the Mvc Controls Toolkit into an asp.net core project. 
It is available on npm. Just install it after you have installed all other npm and Bower dependencies, 
and it'll add:

1. Shared partial views to handle enhanced validation scripts, globalization scripts, html5 fallback widget scripts and css.
2. Javascript [mvcct-enhancer](https://github.com/MvcControlsToolkit/mvcct-enhancer) startup+option file under the folder wwwroot/startupjs.
3. 2 Javascript files containing tasks to:
    * create a minimized version of the globalize library under wwwroot/lib/globalize (you may add more modules if needed by editing this file), and to move culture 
      files to deploy under wwwroot/lib/globalize.
    * minimize the mvcct-enhancer startup+options file

This project is part of the Mvc Controls Toolkit . You can find instructions, 
documentation and more information on the Mvc Controls Toolkit in the [Home repository](https://github.com/MvcControlsToolkit/Home)
