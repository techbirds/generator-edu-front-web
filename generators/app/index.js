"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const mkdirp = require("mkdirp");
const spawn = require("yeoman-generator/lib/actions/spawn-command");
const commandExists = require("command-exists").sync;

module.exports = class extends Generator {
  initializing() {
    this.composeWith(
      require.resolve("generator-edu-front-base/generators/app")
    );
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        "Welcome to the stupendous " +
          chalk.green("edu-front-web") +
          " generator!"
      )
    );

    var prompts = [
      {
        type: "input",
        name: "projectName",
        message: "请输入工程名称 (edu-front-web):",
        default: "edu-front-web"
      },
      {
        type: "input",
        name: "projectDesc",
        message: "请输入工程描述 (A edu front web project):",
        default: "A edu front web project"
      },
      {
        type: "input",
        name: "projectAuthor",
        message: "作者 (edu):",
        default: "edu"
      }
    ];

    return this.prompt(prompts).then(
      function(props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this)
    );
  }

  defaults() {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        "Your generator must be inside a folder named " +
          this.props.projectName +
          "\n" +
          "I'll automatically create this folder."
      );
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }
  }

  writing() {
    this._writingDeploy();
    this._writingBower();
    this._writingDoc();
    this._writingGulp();
    this._writingNEIConfig();
    this._writingPackageJSON();
    this._writingREADME();
    this._writingSrc();
    this._writingTemplate();
    this._writingTest();
  }

  _writingDeploy() {
    this.fs.copy(
      this.templatePath("./deploy"),
      this.destinationPath("./deploy")
    );
  }

  _writingDoc() {
    this.fs.copy(this.templatePath("./doc"), this.destinationPath("./doc"));
  }

  _writingSrc() {
    this.fs.copy(this.templatePath("./src"), this.destinationPath("./src"));
  }

  _writingTemplate() {
    this.fs.copy(
      this.templatePath("./template"),
      this.destinationPath("./template")
    );
  }

  _writingTest() {
    this.fs.copy(this.templatePath("./test"), this.destinationPath("./test"));
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        project_name: this.props.projectName,
        project_desc: this.props.projectDesc,
        project_author: this.props.projectAuthor
      }
    );
  }

  _writingBower() {
    this.fs.copy(
      this.templatePath(".bowerrc"),
      this.destinationPath(".bowerrc")
    );
    this.fs.copy(
      this.templatePath("bower.json"),
      this.destinationPath("bower.json")
    );
  }

  _writingNEIConfig() {
    this.fs.copy(
      this.templatePath("nei.config.js"),
      this.destinationPath("nei.config.js")
    );
  }

  _writingREADME() {
    this.fs.copy(
      this.templatePath("README.md"),
      this.destinationPath("README.md")
    );
  }

  _writingGulp() {
    this.fs.copy(
      this.templatePath("gulpfile.js"),
      this.destinationPath("gulpfile.js")
    );
  }

  install() {
    // // at least one
    var self = this;

    this.installDependencies({
      yarn: false,
      npm: true,
      bower: true
    }).then(function() {
      // 检测NEI是否安装
      if (commandExists("nei")) {
        spawn.spawnCommandSync("npm", ["run", "build"], {});
        self.log(
          "\nRunning " +
            chalk.yellow("npm run build") +
            " for you to build nei mock . If this fails, try running the command yourself."
        );
      } else {
        self.log(
          "\nPlease preinstall NEI Toolkit. Then try running " +
            chalk.yellow("npm run build") +
            " yourself."
        );
      }
    });
  }

  end() {
    // Empty
  }
};
