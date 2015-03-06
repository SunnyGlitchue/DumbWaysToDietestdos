var runningStage = {
    preload: function() {
        game.load.image('runner', 'assets/runningStage/runner.png');
        game.load.image('hiddenButton', 'assets/runningStage/hiddenButton.png');
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = "#34dbdb";
        this.runner = game.add.sprite(game.world.centerX, game.world.centerY, 'runner');
        this.runner.scale.x = 0.2;
        this.runner.scale.y = 0.2;

        this.runner.anchor.set(0.5, 0.5);
        game.physics.arcade.enable(this.runner);
        this.runner.body.collideWorldBounds = false;
        this.runner.body.velocity.y = 20;
        this.runner.body.enableDrag = true;

        this.hiddenButton = game.add.sprite(0, 0, 'hiddenButton');
        this.hiddenButton.inputEnabled = true;
        this.hiddenButton.events.onInputDown.add(this.tapped, this);

        // this.left_toaster = game.add.sprite(-180, 110, 'toaster');
        // game.physics.arcade.enable(this.left_toaster);
        // this.left_toaster.enableBody = true;
        // this.left_toaster.body.collideWorldBounds = false;

        // this.right_toaster = game.add.sprite(530, 110, 'toaster');
        // game.physics.arcade.enable(this.right_toaster);
        // this.right_toaster.enableBody = true;
        // this.right_toaster.body.collideWorldBounds = false;

        // duration bar
        this.preloadBar = game.add.graphics(0, 3);
        this.preloadBar.lineStyle(3, 0xaa3300, 1);
        this.preloadBar.moveTo(0, 0);
        this.preloadBar.lineTo(game.width, 0);
        this.preloadBar.scale.x = 1;
        this.preloadBar.scale.y = 3;

        // set the time after which the game ends
        game.time.events.add(Phaser.Timer.SECOND * this.duration, this.endStage, this);

        // moves duration bar
        game.time.events.repeat(Phaser.Timer.SECOND / 20, this.duration * 20, this.decreaseTimer, this);
    },

    update: function() {
        if (this.runner.body.position.y > 800) {
            console.log("win");
        }

        if (this.runner.body.velocity.y > 0) {
        	this.runner.body.velocity.y --;
        };
    },

    tapped: function() {
    	console.log("tapped");
    	this.runner.scale.x *= 1.04;
    	this.runner.scale.y *= 1.04;
    	this.runner.body.velocity.y += 20;
    	// game.add.tween(this.runner.scale).to( { x: this.runner.scale.x*1.05, y: this.runner.scale.y*1.05 }, 500, Phaser.Easing.Linear.None, true);
    },
    
    // time allocated for stage
    duration: 5,

    endStage: function() {
        game.state.start('scoreStage');
    },

    decreaseTimer: function () {
        this.preloadBar.scale.x -= 1/this.duration/20;
    }
}