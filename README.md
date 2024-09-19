# Lorem Ipsum Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page that allows the user to display different paragraphs. Once the user enters the number of paragraphs to display and press `Generate`, it will generate the number of paragraphs the user entered. If the user entered 7 and pressed `Generate`, 7 random paragraphs of lorem ipsum will be displayed.

## Technologies used

1. Typescript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/Lorem-Ipsum-Page`](https://www.diegolibonati.com.ar/#/project/Lorem-Ipsum-Page)

## Video

https://github.com/DiegoLibonati/Lorem-Ipsum-Page/assets/99032604/43038cfd-c1f1-4419-bef9-6197340d1d0a

## Documentation

Element of input to get the value when button is clicked to generate paragraphs:

```
const numberOfParagraphs = document.querySelector(
  ".article-center input"
) as HTMLInputElement;
```

Element of button to generate paragraphs:

```
const btnGenerate = document.querySelector(
  ".article-center button"
) as HTMLButtonElement;
```

Element to contain all paragraphs once generated:

```
const articleContainer = document.querySelector(
  ".article-center-generate"
) as HTMLElement;
```

A fragment is created to save all the elements we create once we click on generate:

```
const fragment = new DocumentFragment();
```

In this array we store all the paragraphs that can be used, and new ones can be added:

```
export const paragraphs: Paragraph[] = [
  `I'm baby intelligentsia hot chicken iPhone, letterpress food truck lomo roof party celiac +1 photo booth yr thundercats affogato. Poke pork belly PBR&B, vape fashion axe hashtag chillwave brooklyn cloud bread marfa cold-pressed adaptogen. Ennui tilde fam, chicharrones irony you probably haven't heard of them raclette poutine. Intelligentsia seitan chicharrones, enamel pin brunch vaporware art party kitsch retro. Vegan sustainable tumeric cronut. Pug aesthetic PBR&B glossier selvage, art party salvia wayfarers. Etsy taiyaki typewriter chicharrones, taxidermy cold-pressed pabst vinyl cronut pok pok 8-bit fam.`,
  `Activated charcoal direct trade palo santo vape everyday carry pork belly mustache kitsch gochujang. Vexillologist shoreditch deep v, keytar ethical seitan sartorial kale chips irony tumeric microdosing brunch. Keffiyeh master cleanse next level, glossier lumbersexual shaman af edison bulb distillery knausgaard vape small batch portland. Cred truffaut vape deep v +1, gastropub hot chicken raw denim helvetica umami offal.`,
  `Dreamcatcher sartorial asymmetrical crucifix wolf godard, coloring book squid freegan affogato lumbersexual franzen. Drinking vinegar vape chillwave pinterest tofu pug hella sartorial neutra cray tumeric. Poke cloud bread XOXO salvia. Glossier jean shorts craft beer gastropub, squid pitchfork humblebrag listicle taiyaki messenger bag retro thundercats subway tile raw denim. Hoodie asymmetrical food truck listicle pour-over.`,
  `Pop-up tote bag twee squid asymmetrical lyft roof party ugh try-hard glossier pabst bicycle rights jean shorts single-origin coffee. IPhone tumblr narwhal, tattooed mumblecore you probably haven't heard of them XOXO authentic art party bicycle rights. Bespoke bitters master cleanse austin authentic lumbersexual mixtape man bun art party tilde swag. Tacos bitters chicharrones thundercats selfies chartreuse chia. Put a bird on it taxidermy cornhole VHS, tousled ennui fam hexagon craft beer marfa DIY pinterest.`,
  `Air plant deep v polaroid church-key. Farm-to-table ramps put a bird on it pickled aesthetic pork belly beard tbh street art pabst. Pop-up cliche before they sold out hoodie heirloom flannel schlitz organic. Crucifix forage cardigan before they sold out umami echo park subway tile art party squid shoreditch photo booth.`,
  `Yr offal cornhole neutra. Cronut kale chips hoodie, mustache tilde tacos palo santo fashion axe whatever pop-up post-ironic pitchfork pok pok ethical. Literally freegan post-ironic wolf listicle synth gochujang tousled palo santo 3 wolf moon health goth next level. Asymmetrical you probably haven't heard of them lomo post-ironic, pitchfork crucifix narwhal retro chia tofu schlitz. Kitsch keytar normcore listicle flexitarian fashion axe chartreuse jianbing yr vice flannel cred.`,
  `Jianbing live-edge bicycle rights messenger bag, street art offal squid gastropub food truck kale chips locavore. Mustache humblebrag banjo, shaman offal photo booth coloring book mumblecore typewriter tbh you probably haven't heard of them. Disrupt glossier umami pop-up, schlitz listicle keytar ramps. Try-hard tumblr crucifix aesthetic lyft.`,
  `Try-hard woke irony selvage listicle, literally adaptogen tilde messenger bag deep v hexagon stumptown gastropub. YOLO yuccie godard copper mug, slow-carb put a bird on it williamsburg offal craft beer trust fund sustainable palo santo 8-bit. Venmo XOXO drinking vinegar kale chips cred semiotics, vinyl helvetica hoodie bespoke leggings pop-up. Polaroid lomo tofu vape. Chicharrones mumblecore taiyaki, direct trade prism vinyl cardigan subway tile flexitarian. Aesthetic food truck glossier coloring book. Biodiesel distillery crucifix schlitz skateboard ennui master cleanse pok pok normcore cardigan.`,
  `Cliche organic woke yr gluten-free, twee PBR&B everyday carry 8-bit roof party. Hexagon craft beer pinterest humblebrag raw denim pabst schlitz celiac. Quinoa hoodie man braid, iPhone flannel chia scenester pinterest kickstarter enamel pin health goth aesthetic art party cliche mustache. Irony cred street art locavore green juice.`,
  `Tilde twee af drinking vinegar trust fund. Ramps vaporware hell of kombucha 8-bit chambray YOLO wolf vinyl pop-up cornhole activated charcoal mixtape. Mixtape marfa before they sold out XOXO poutine craft beer scenester cronut drinking vinegar knausgaard you probably haven't heard of them hella. Literally selvage mumblecore activated charcoal echo park vegan deep v fingerstache irony kogi microdosing trust fund. Schlitz cloud bread activated charcoal, master cleanse kitsch shoreditch umami bicycle rights la croix post-ironic biodiesel edison bulb. 8-bit disrupt banjo selvage. Flannel selfies organic put a bird on it keytar, lo-fi health goth umami fam four loko kombucha adaptogen hammock austin tilde.`,
];
```

When the button is clicked first the content of the element that stores all the elements will be cleaned, then the number of times that the user entered as number of paragraphs to generate will be scrolled and in each iteration a p element will be created, a paragraph will be obtained randomly from the array of paragraphs, then text will be added to that paragraph and that element will be added to the fragment. Once the whole fragment has been traversed, it will be added in its entirety to the container element:

```
btnGenerate.addEventListener("click", () => {
  articleContainer.textContent = "";

  const valueGenerate = Number(numberOfParagraphs.value);

  for (let i = 0; i < valueGenerate; i++) {
    const elementP = document.createElement("p");

    const randomValue = Math.floor(Math.random() * paragraphs.length);

    elementP.textContent = paragraphs[randomValue];

    fragment.append(elementP);
  }

  articleContainer.append(fragment);
});
```
