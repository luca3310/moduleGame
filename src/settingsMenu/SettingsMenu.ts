import Phaser from "phaser";
import { createButton } from "../mainMenu/Button"; 
import { buttonStyle } from "../mainMenu/MainMenuStyles"; 

export default class SettingsMenu extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image;
  private volume: number = 1; // Standard lydniveau
  private fullscreen: boolean = false; // Hel-skærm tilstand
  private graphicsQuality: string = "Sebastian Computer"; // Standard grafikindstilling
  private graphicsValues: string[] = ['Sebastian Computer', 'Medium', 'High', 'Ultra High'];

  private graphicsDropdown!: Phaser.GameObjects.Container; // Container for dropdown
  private isDropdownOpen: boolean = false; // Tilstand for dropdown-menu
  private graphicsButton!: Phaser.GameObjects.Text; // Reference til grafikindstillingsknappen
  private isWithInTileOutline: number = 1; // Standard værdi for isWithInTileOutline

  constructor() {
    super({ key: "SettingsMenu" });
  }

  preload(): void {
    this.load.image('settingsBackground', 'assets/settingsBackground.jpg'); 
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Baggrund
    this.background = this.add.image(width / 2, height / 2, 'settingsBackground')
      .setOrigin(0.5)
      .setDisplaySize(width, height);

    // Indlæs gemte indstillinger
    this.loadSettings();

    // Titel
    const titleText = this.add.text(width / 2, height / 2 - 150, "Settings", {
      fontSize: "64px",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
    }).setOrigin(0.5);

    // Lydkontrol
    const volumeText = this.add.text(width / 2, height / 2 - 50, "Volume: " + Math.round(this.volume * 100) + "%", {
      fontSize: "24px",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
    }).setOrigin(0.5);

    // Volume Slider
    const volumeSlider = this.add.graphics();
    volumeSlider.fillStyle(0xffffff, 1);
    volumeSlider.fillRect(width / 2 - 100, height / 2, 200, 10);

    // Volume justering
    this.input.on('pointermove', (pointer: { isDown: any; y: number; x: number; }) => {
      if (pointer.isDown && pointer.y >= height / 2 && pointer.y <= height / 2 + 10) {
        this.volume = Phaser.Math.Clamp((pointer.x - (width / 2 - 100)) / 200, 0, 1);
        volumeText.setText("Volume: " + Math.round(this.volume * 100) + "%");
      }
    });

    // Hel-skærmsknap
    const fullscreenButton = createButton(this, width / 2, height / 2 + 100, "Toggle Fullscreen", buttonStyle, () => {
      this.fullscreen = !this.fullscreen;
      if (this.fullscreen) {
        this.scale.startFullscreen();
        fullscreenButton.setText("Exit Fullscreen");
      } else {
        this.scale.stopFullscreen();
        fullscreenButton.setText("Toggle Fullscreen");
      }
    });

    // Grafikindstillingsknap
    this.graphicsButton = createButton(this, width / 2, height / 2 + 200, "Graphics: " + this.graphicsQuality, buttonStyle, () => {
      this.toggleGraphicsDropdown();
    });

    // Tilføj grafikdropdown
    this.graphicsDropdown = this.add.container(width / 2, height / 2 + 250).setVisible(false);
    this.graphicsValues.forEach((quality, index) => {
      const qualityButton = createButton(this, 0, index * 50, quality, buttonStyle, () => {
        this.selectGraphicsQuality(quality); // Vælg grafikindstilling
      });
      this.graphicsDropdown.add(qualityButton);
      qualityButton.setOrigin(0.5); // Centrer knapperne
      qualityButton.setInteractive(); // Gør knapperne interaktive
      qualityButton.on('pointerover', () => qualityButton.setStyle({ fill: '#ff0' })); // Ændre farve ved hover
      qualityButton.on('pointerout', () => qualityButton.setStyle({ fill: '#fff' })); // Ændre tilbage ved hover out
    });

    // Gem knap
    const saveButton = createButton(this, width / 2, height / 2 + 350, "Save Settings", buttonStyle, () => {
      this.saveSettings(); // Gem indstillingerne
    });

    // Tilføj baggrundsvisning
    const backButton = createButton(this, width / 2, height / 2 + 400, "Back", buttonStyle, () => {
      this.scene.stop("SettingsMenu");
      this.scene.start("MainMenu"); // Skift til hovedmenuen
    });
  }

  loadSettings(): void {
    const savedVolume = localStorage.getItem('volume');
    const savedFullscreen = localStorage.getItem('fullscreen');
    const savedGraphicsQuality = localStorage.getItem('graphicsQuality');

    if (savedVolume) {
      this.volume = parseFloat(savedVolume);
    }

    if (savedFullscreen) {
      this.fullscreen = savedFullscreen === 'true';
    }

    if (savedGraphicsQuality) {
      this.graphicsQuality = savedGraphicsQuality;
      this.setGraphicsQuality(this.graphicsQuality); // Opdater isWithInTileOutline baseret på den gemte indstilling
    }
  }

  saveSettings(): void {
    localStorage.setItem('volume', this.volume.toString());
    localStorage.setItem('fullscreen', this.fullscreen.toString());
    localStorage.setItem('graphicsQuality', this.graphicsQuality);
    console.log("Settings saved!");
  }

  toggleGraphicsDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.graphicsDropdown.setVisible(this.isDropdownOpen);
    
    // Opdater Y-positionen for dropdown-menuen
    const dropdownY = this.isDropdownOpen ? this.graphicsButton.y + 50 : -100; // Justér Y-positionen
    this.graphicsDropdown.setY(dropdownY);
  }

  selectGraphicsQuality(quality: string): void {
    this.graphicsQuality = quality;
    this.setGraphicsQuality(this.graphicsQuality); // Opdater isWithInTileOutline når der vælges en kvalitet
    this.graphicsButton.setText("Graphics: " + this.graphicsQuality);
    this.toggleGraphicsDropdown(); // Luk dropdown-menu
  }
  

  setGraphicsQuality(quality: string): void {
    let qualityValue;

    switch (quality) {
        case 'Sebastian Computer':
            qualityValue = 1; // Sebastian Computer
            break;
        case 'Medium':
            qualityValue = 10;
            break;
        case 'High':
            qualityValue = 100;
            break;
        case 'Ultra High':
            qualityValue = 1000;
            break;
        default:
            qualityValue = 1; // default værdi
    }

    // Gem grafikindstillingen i localStorage
    localStorage.setItem('graphicsQuality', quality);
    this.isWithInTileOutline = qualityValue; // Opdaterer isWithInTileOutline
    
    // Log den valgte grafikindstilling til konsollen
    console.log(`Selected graphics quality: ${quality} (Value: ${qualityValue})`);
}
}