/* ============================================================
   КРИСТАЛЬНАЯ ПЕЩЕРА — данные
   Загадки, тексты чтения, банки вопросов
   ============================================================ */

/* ============================================================
   1. ГЕОМЕТРИЯ СЦЕНЫ
   ============================================================ */

const CRYSTALS = [
  [1450,665],[1150,880],[880,895],[1455,300],[1150,90],[760,75],
  [600,890],[390,95],[140,330],[110,620],[330,850],[110,120]
];

const DEFS = `
<defs>
  <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#090d1d"/>
    <stop offset="50%" stop-color="#121a33"/>
    <stop offset="100%" stop-color="#080c1a"/>
  </linearGradient>
  <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
    <stop offset="0%"  stop-color="#d6f0ff" stop-opacity="0.80"/>
    <stop offset="28%" stop-color="#79bcff" stop-opacity="0.38"/>
    <stop offset="62%" stop-color="#3d6fd8" stop-opacity="0.14"/>
    <stop offset="100%" stop-color="#1b2f6b" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="crystalHalo" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#bff0ff" stop-opacity="0.95"/>
    <stop offset="45%" stop-color="#59b6ff" stop-opacity="0.42"/>
    <stop offset="100%" stop-color="#3a7dff" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="portalGrad" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#9ce8ff" stop-opacity="0.75"/>
    <stop offset="55%" stop-color="#5f7dff" stop-opacity="0.30"/>
    <stop offset="100%" stop-color="#2a2f7a" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ffe27a"/>
    <stop offset="100%" stop-color="#c8941a"/>
  </linearGradient>
  <linearGradient id="lightBeam" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#ffe9a8" stop-opacity="0.85"/>
    <stop offset="100%" stop-color="#ffe9a8" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="alienGlow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#c8a8ff" stop-opacity="0.85"/>
    <stop offset="60%" stop-color="#7a52ff" stop-opacity="0.35"/>
    <stop offset="100%" stop-color="#3a1f8a" stop-opacity="0"/>
  </radialGradient>
  <clipPath id="clipChest">
    <path d="M648 634 C648 540 720 496 800 496 C880 496 952 540 952 634 L938 634 L938 742 C938 762 920 772 900 772 L700 772 C680 772 662 762 662 742 L662 634 Z"/>
  </clipPath>
</defs>`;

const BACKDROP = `
<rect width="1600" height="900" fill="url(#bgGrad)"/>
<path d="M600 900 L600 566 C600 404 694 320 800 320 C906 320 1000 404 1000 566 L1000 900 Z" fill="#0b1124"/>
<path d="M644 900 L644 574 C644 434 718 362 800 362 C882 362 956 434 956 574 L956 900 Z" fill="#0f1732"/>
<path d="M0 0 L0 900 L360 900 C318 780 350 660 310 520 C274 390 320 200 400 60 L420 0 Z" fill="#1a2340"/>
<path d="M0 0 L0 320 L150 280 L186 110 L206 0 Z" fill="#222d50" opacity="0.75"/>
<path d="M0 900 L0 618 L176 656 L246 818 L226 900 Z" fill="#151d36" opacity="0.85"/>
<path d="M310 520 L360 470 L372 560 L330 610 Z" fill="#141c34" opacity="0.8"/>
<path d="M1600 0 L1600 900 L1240 900 C1282 780 1250 660 1290 520 C1326 390 1280 200 1200 60 L1180 0 Z" fill="#1a2340"/>
<path d="M1600 0 L1600 320 L1450 280 L1414 110 L1394 0 Z" fill="#222d50" opacity="0.75"/>
<path d="M1600 900 L1600 618 L1424 656 L1354 818 L1374 900 Z" fill="#151d36" opacity="0.85"/>
<path d="M1290 520 L1240 470 L1228 560 L1270 610 Z" fill="#141c34" opacity="0.8"/>
<g fill="#1e2846">
  <path d="M430 0 L500 0 L470 176 L448 92 Z"/>
  <path d="M540 0 L592 0 L568 122 Z"/>
  <path d="M700 0 L742 0 L720 92 Z"/>
  <path d="M880 0 L932 0 L906 126 Z"/>
  <path d="M1020 0 L1092 0 L1058 166 L1040 84 Z"/>
  <path d="M1120 0 L1162 0 L1142 112 Z"/>
</g>
<path d="M0 792 C240 730 480 772 800 780 C1120 788 1360 730 1600 792 L1600 900 L0 900 Z" fill="#111a30"/>
<path d="M0 832 C300 792 600 822 900 828 C1200 834 1400 800 1600 832 L1600 900 L0 900 Z" fill="#0c1324"/>
<g fill="#1b2440" opacity="0.9">
  <ellipse cx="200" cy="836" rx="72" ry="24"/>
  <ellipse cx="1420" cy="844" rx="88" ry="28"/>
  <ellipse cx="1060" cy="862" rx="62" ry="20"/>
</g>`;

/* ============================================================
   2. КАТЕГОРИИ
   ============================================================ */

const CATEGORIES = {
  creature: { name: "Существа",        icon: "🐉", color: "#5fe0ff" },
  treasure: { name: "Сокровища",       icon: "💰", color: "#ffd24a" },
  machine:  { name: "Древние машины",  icon: "⚙️", color: "#ff9a4a" }
};

/* ============================================================
   3. ЗАГАДКИ
   ============================================================ */

const DRAGON_ART = `<g stroke="#142d36" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
<ellipse cx="835" cy="795" rx="380" ry="35" fill="#060d1c" opacity=".6" stroke="none"/>
<!-- far wing -->
<path d="M826 610 Q775 425 974 270 Q959 407 1052 498 Q932 462 889 628Z" fill="#354d66"/>
<path d="M826 610 Q844 422 974 270 M850 532 Q912 439 1052 498" fill="none" stroke="#567b87"/>
<!-- tail, continuously joined to the rump -->
<path d="M973 638 C1083 645 1118 755 1222 730 Q1310 710 1280 616 Q1369 722 1272 783 C1158 845 1095 736 978 752Z" fill="#397c73"/>
<path d="M1032 717 Q1174 826 1272 769" fill="none" stroke="#78aca0" stroke-width="13"/>
<path d="M1246 688 L1280 616 L1303 682 L1277 667Z" fill="#78a9a0"/>
<!-- far feet -->
<path d="M668 680 Q625 729 620 776 L707 781 Q749 754 736 700Z" fill="#2b5c59"/>
<path d="M928 690 Q988 727 999 780 L1091 780 Q1105 762 1070 745 L1023 667Z" fill="#2b5c59"/>
<!-- body and sweeping neck -->
<path d="M628 478 C650 514 664 569 719 584 C803 545 947 559 1004 636 C1058 713 994 774 901 778 L737 777 C649 771 587 704 582 622 L574 502Z" fill="#438c7c"/>
<path d="M598 503 C601 582 615 661 680 704 Q741 750 845 751 Q756 794 693 756 C604 713 566 618 574 514Z" fill="#b4bf87" stroke="none"/>
<path d="M593 566 L622 560 M603 601 L640 590 M619 638 L659 617 M644 674 L686 649 M678 706 L719 677" fill="none" stroke="#7d956c" stroke-width="4"/>
<!-- near wing with three connected spars -->
<path d="M776 631 C751 515 807 385 1014 300 C988 390 1030 477 1129 562 Q1056 539 1015 591 Q965 548 919 612 Q862 572 814 653Z" fill="#695b89"/>
<path d="M784 625 Q801 439 1014 300 Q958 445 1015 591 M1014 300 Q903 449 919 612 M1014 300 Q1041 476 1129 562" fill="none" stroke="#8e86af" stroke-width="6"/>
<path d="M776 631 Q748 499 832 418 Q904 346 1014 300" fill="none" stroke="#4c9285" stroke-width="15"/>
<!-- near hind leg -->
<path d="M942 653 C1006 671 1016 730 978 757 L1012 776 Q1036 798 1001 804 L892 804 Q877 795 898 776 L932 753 Q879 738 883 700 Q888 666 917 658" fill="#3c8172"/>
<path d="M909 801 l7 -17 M939 802 l6 -17 M970 801 l4 -17" stroke="#bfc99e" stroke-width="7"/>
<!-- near foreleg, shoulder connected beneath neck -->
<path d="M704 653 Q731 692 707 744 L690 780 L745 782 Q774 793 752 807 L644 807 Q621 799 637 778 L659 720 L657 681" fill="#4a9280"/>
<path d="M662 803 l6 -17 M692 804 l6 -17 M722 803 l4 -16" stroke="#c8cda5" stroke-width="7"/>
<!-- head and muzzle -->
<path d="M563 410 L558 367 Q589 380 596 414 M613 416 L632 372 Q645 404 632 437" fill="#d4c79d"/>
<path d="M645 463 L684 442 L668 481 L688 494 L650 510" fill="#417c71"/>
<path d="M647 445 C625 408 567 407 541 438 L516 468 Q473 467 466 495 Q463 520 505 532 L570 536 Q619 536 648 498 Q659 475 647 445Z" fill="#509783"/>
<path d="M474 510 Q520 525 569 511" fill="none" stroke="#234b46" stroke-width="4"/>
<path d="M582 441 Q600 430 618 442" fill="none" stroke="#2d6559" stroke-width="6"/>
<path d="M575 456 Q591 442 610 455 Q601 479 581 471Z" fill="#f0cf72" stroke-width="3"/>
<ellipse cx="592" cy="458" rx="5" ry="11" fill="#192e32" stroke="none"/>
<circle cx="595" cy="453" r="3" fill="#fff0c4" stroke="none"/>
<ellipse cx="495" cy="488" rx="5" ry="3" fill="#244e46" stroke="none"/>
<path d="M625 512 Q635 510 641 499 M629 543 l12 9 M647 567 l14 8 M752 718 l14 7 M779 730 l14 5 M1048 715 l13 9" fill="none" stroke="#2b685e" stroke-width="3"/>
</g>`;
const DRAGON_REGIONS = [[0, 780, 1600, 120], [1130, 0, 470, 780], [870, 700, 260, 80], [0, 700, 870, 80], [1010, 0, 120, 700], [460, 0, 280, 435], [740, 0, 270, 440], [740, 440, 270, 140], [740, 580, 270, 120], [460, 540, 280, 160], [460, 435, 140, 105], [600, 435, 140, 105]];

const CHEST_PARTS = ["<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><ellipse cx=\"830\" cy=\"801\" rx=\"325\" ry=\"35\" fill=\"#080e1c\" stroke=\"none\"/></g>", "<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><g fill=\"#d4aa54\" stroke=\"#75583d\" stroke-width=\"3\">\n<ellipse cx=\"540\" cy=\"797\" rx=\"30\" ry=\"10\"/><path d=\"M510 785 v12 a30 10 0 0 0 60 0 v-12\"/><ellipse cx=\"540\" cy=\"785\" rx=\"30\" ry=\"10\" fill=\"#efd18a\"/>\n<ellipse cx=\"492\" cy=\"817\" rx=\"27\" ry=\"10\" fill=\"#efd18a\"/>\n<ellipse cx=\"590\" cy=\"824\" rx=\"29\" ry=\"10\" fill=\"#d4aa54\"/></g></g>", "<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><g fill=\"#d4aa54\" stroke=\"#75583d\" stroke-width=\"3\">\n<path d=\"M1090 794 v16 a31 10 0 0 0 62 0 v-16\"/><ellipse cx=\"1121\" cy=\"794\" rx=\"31\" ry=\"10\" fill=\"#efd18a\"/>\n<ellipse cx=\"1183\" cy=\"823\" rx=\"27\" ry=\"10\" fill=\"#efd18a\"/>\n<ellipse cx=\"1056\" cy=\"826\" rx=\"25\" ry=\"9\" fill=\"#efd18a\"/>\n<path d=\"M1095 803 q25 10 52 0\" fill=\"none\"/></g></g>", "<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M594 744 L635 747 L635 798 L605 798Z M948 742 L988 742 L984 798 L954 798Z\" fill=\"#555763\"/>\n<path d=\"M1014 710 L1047 701 L1045 752 L1014 767Z\" fill=\"#424552\"/></g>", "<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M972 588 L1084 527 L1084 722 Q1084 739 1067 748 L972 797Z\" fill=\"#664b46\"/>\n<path d=\"M995 642 L1062 605 M995 694 L1062 657 M995 745 L1062 709\" stroke=\"#443a3e\" stroke-width=\"4\"/>\n<path d=\"M1020 649 L1052 632 L1052 666 L1020 684Z\" fill=\"#c4a46d\"/>\n<path d=\"M1025 660 Q1008 696 1039 687 Q1063 678 1049 649\" fill=\"none\" stroke=\"#252d3a\" stroke-width=\"9\"/></g>", "<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M570 580 L978 580 L978 782 Q978 797 962 797 L587 797 Q570 797 570 780Z\" fill=\"#93684f\"/>\n<path d=\"M585 638 H961 M585 691 H961 M585 744 H961\" stroke=\"#634b43\" stroke-width=\"4\"/>\n<path d=\"M602 610 Q671 600 719 615 M823 665 Q870 655 930 669 M698 720 Q750 730 811 718 M600 769 Q647 758 690 768\" fill=\"none\" stroke=\"#b0825e\" stroke-width=\"4\"/>\n<path d=\"M573 782 H974\" stroke=\"#624c45\" stroke-width=\"10\"/></g>", "<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M570 579 C570 478 644 418 772 418 L888 358 C1008 358 1084 420 1084 526 L978 587Z\" fill=\"#b08560\"/>\n<path d=\"M772 418 C900 418 978 478 978 587 L570 587 C570 478 644 418 772 418Z\" fill=\"#a57856\"/>\n<path d=\"M888 358 C1008 358 1084 420 1084 526 L978 587 C978 478 900 418 772 418Z\" fill=\"#bb9168\"/>\n<path d=\"M599 497 Q770 462 942 502 M579 549 Q771 530 970 550\" fill=\"none\" stroke=\"#775642\" stroke-width=\"4\"/>\n<path d=\"M827 408 L938 369 M893 439 L1008 397 M942 484 L1054 438 M970 535 L1078 486\" fill=\"none\" stroke=\"#97704f\" stroke-width=\"4\"/></g>", "<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M623 587 C623 508 662 452 697 429 L732 422 C680 470 660 518 660 587 L660 796 L623 796Z\" fill=\"#667786\"/>\n<path d=\"M863 435 C913 468 941 518 941 587 L941 796 L904 796 L904 587 C904 514 884 474 830 424Z\" fill=\"#667786\"/>\n<path d=\"M633 597 V783 M914 597 V783\" fill=\"none\" stroke=\"#8fa3ad\" stroke-width=\"4\"/>\n<path d=\"M570 579 H978 L1084 518 V535 L978 596 H570Z\" fill=\"#d2b37e\"/>\n<path d=\"M570 596 H978\" stroke=\"#322d35\" stroke-width=\"6\"/></g>", "<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><g fill=\"#c2c9bf\" stroke=\"#38434f\" stroke-width=\"2\">\n<circle cx=\"642\" cy=\"616\" r=\"5\"/><circle cx=\"642\" cy=\"679\" r=\"5\"/><circle cx=\"642\" cy=\"767\" r=\"5\"/>\n<circle cx=\"922\" cy=\"616\" r=\"5\"/><circle cx=\"922\" cy=\"679\" r=\"5\"/><circle cx=\"922\" cy=\"767\" r=\"5\"/>\n<circle cx=\"650\" cy=\"516\" r=\"5\"/><circle cx=\"682\" cy=\"460\" r=\"5\"/><circle cx=\"907\" cy=\"516\" r=\"5\"/><circle cx=\"875\" cy=\"465\" r=\"5\"/>\n</g><path d=\"M572 755 L599 755 L599 794 L586 794 Q572 794 572 779Z M950 755 H976 V782 Q976 794 962 794 H950Z\" fill=\"#667786\"/></g>", "<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M753 570 H797 V633 H753Z\" fill=\"#c5a46d\"/>\n<path d=\"M756 641 V623 C756 596 794 596 794 623 V641\" fill=\"none\" stroke=\"#2c303b\" stroke-width=\"15\"/>\n<path d=\"M756 641 V623 C756 596 794 596 794 623 V641\" fill=\"none\" stroke=\"#dec391\" stroke-width=\"8\"/>\n<rect x=\"741\" y=\"636\" width=\"68\" height=\"67\" rx=\"12\" fill=\"#d1ad64\"/>\n<path d=\"M751 646 H797\" fill=\"none\" stroke=\"#edcf8a\" stroke-width=\"4\"/>\n<path d=\"M781 669 a8 8 0 1 0 -12 0 l-3 17 h18Z\" fill=\"#403841\" stroke=\"none\"/></g>", "<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M455 765 L440 709 L479 733 L501 690 L524 733 L562 709 L548 765Z\" fill=\"#d8b969\"/>\n<path d=\"M455 756 Q501 746 548 756 L548 775 Q501 764 455 775Z\" fill=\"#ba9050\"/>\n<path d=\"M481 740 L501 721 L521 740 L501 756Z\" fill=\"#63b8be\" stroke-width=\"3\"/>\n<circle cx=\"440\" cy=\"707\" r=\"6\" fill=\"#e7cc89\"/><circle cx=\"501\" cy=\"688\" r=\"6\" fill=\"#e7cc89\"/><circle cx=\"562\" cy=\"707\" r=\"6\" fill=\"#e7cc89\"/></g>", "<g stroke=\"#352c35\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M1174 774 L1190 753 L1216 758 L1227 782 L1198 802Z\" fill=\"#74bfc1\" stroke-width=\"3\"/>\n<path d=\"M1174 774 L1198 778 L1190 753 M1198 778 L1216 758 M1198 778 L1227 782 M1198 778 V802\" fill=\"none\" stroke=\"#b2d9cd\" stroke-width=\"3\"/>\n<path d=\"M1094 775 L1108 753 L1128 765 L1115 785Z\" fill=\"#9b7caa\" stroke-width=\"3\"/>\n</g>"];

const REDRAW_ART = {"mechanism": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M530 745 L1050 745 L1090 799 L495 799Z\" fill=\"#64717c\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"550\" y=\"708\" width=\"480\" height=\"47\" rx=\"10\" fill=\"#a4916c\" stroke=\"#253443\" stroke-width=\"5\"/><rect x=\"589\" y=\"402\" width=\"32\" height=\"308\" rx=\"10\" fill=\"#627c83\" stroke=\"#253443\" stroke-width=\"5\"/><rect x=\"980\" y=\"402\" width=\"32\" height=\"308\" rx=\"10\" fill=\"#627c83\" stroke=\"#253443\" stroke-width=\"5\"/><rect x=\"567\" y=\"390\" width=\"468\" height=\"40\" rx=\"12\" fill=\"#a4916c\" stroke=\"#253443\" stroke-width=\"5\"/><path d=\"M608 548 H990\" fill=\"none\" stroke=\"#889aa2\" stroke-width=\"20\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><polygon points=\"781.6,550.0 799.0,565.0 796.1,579.8 774.2,587.0 768.7,598.3 776.2,620.0 766.3,631.3 743.8,626.6 733.3,633.7 729.0,656.2 714.8,661.1 697.6,645.8 685.0,646.6 670.0,664.0 655.2,661.1 648.0,639.2 636.7,633.7 615.0,641.2 603.7,631.3 608.4,608.8 601.3,598.3 578.8,594.0 573.9,579.8 589.2,562.6 588.4,550.0 571.0,535.0 573.9,520.2 595.8,513.0 601.3,501.7 593.8,480.0 603.7,468.7 626.2,473.4 636.7,466.3 641.0,443.8 655.2,438.9 672.4,454.2 685.0,453.4 700.0,436.0 714.8,438.9 722.0,460.8 733.3,466.3 755.0,458.8 766.3,468.7 761.6,491.2 768.7,501.7 791.2,506.0 796.1,520.2 780.8,537.4\" fill=\"#b79b67\" stroke=\"#343b45\" stroke-width=\"5\"/><ellipse cx=\"685\" cy=\"550\" rx=\"71.3\" ry=\"71.3\" fill=\"#435866\" stroke=\"#263541\" stroke-width=\"4\"/><path d=\"M710.0 550.0 L752.85 550.0\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M697.5 571.650635094611 L718.925 608.7598236467742\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M672.5 571.650635094611 L651.075 608.7598236467742\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M660.0 550.0 L617.15 550.0\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M672.5 528.349364905389 L651.0749999999999 491.2401763532259\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M697.5 528.349364905389 L718.925 491.2401763532258\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"685\" cy=\"550\" rx=\"23\" ry=\"23\" fill=\"#d0b47b\" stroke=\"#35414b\" stroke-width=\"4\"/><ellipse cx=\"685\" cy=\"550\" rx=\"8\" ry=\"8\" fill=\"#5e7079\" stroke=\"none\" stroke-width=\"4\"/><polygon points=\"933.5,550.0 945.0,562.2 942.2,574.1 926.4,579.7 921.0,588.5 923.2,605.2 913.8,613.1 897.7,608.4 888.2,612.3 880.2,627.0 868.0,628.0 857.8,614.7 847.8,612.3 832.6,619.5 822.2,613.1 821.7,596.3 815.0,588.5 798.5,585.4 793.8,574.1 803.3,560.2 802.5,550.0 791.0,537.8 793.8,525.9 809.6,520.3 815.0,511.5 812.8,494.8 822.2,486.9 838.3,491.6 847.8,487.7 855.8,473.0 868.0,472.0 878.2,485.3 888.2,487.7 903.4,480.5 913.8,486.9 914.3,503.7 921.0,511.5 937.5,514.6 942.2,525.9 932.7,539.8\" fill=\"#b79b67\" stroke=\"#343b45\" stroke-width=\"5\"/><ellipse cx=\"868\" cy=\"550\" rx=\"48.36\" ry=\"48.36\" fill=\"#435866\" stroke=\"#263541\" stroke-width=\"4\"/><path d=\"M893.0 550.0 L914.02 550.0\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M880.5 571.650635094611 L891.01 589.8544890821598\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M855.5 571.650635094611 L844.99 589.8544890821598\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M843.0 550.0 L821.98 550.0\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M855.5 528.349364905389 L844.99 510.14551091784017\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M880.5 528.349364905389 L891.01 510.14551091784017\" fill=\"none\" stroke=\"#b79b67\" stroke-width=\"13\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"868\" cy=\"550\" rx=\"23\" ry=\"23\" fill=\"#d0b47b\" stroke=\"#35414b\" stroke-width=\"4\"/><ellipse cx=\"868\" cy=\"550\" rx=\"8\" ry=\"8\" fill=\"#5e7079\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M938 550 H1064 V495\" fill=\"#a4916c\" stroke=\"#253443\" stroke-width=\"14\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"1064\" cy=\"486\" rx=\"17\" ry=\"29\" fill=\"#668d87\" stroke=\"#263541\" stroke-width=\"4\"/><rect x=\"750\" y=\"301\" width=\"110\" height=\"95\" rx=\"16\" fill=\"#567c7b\" stroke=\"#253443\" stroke-width=\"5\"/><ellipse cx=\"805\" cy=\"322\" rx=\"58\" ry=\"17\" fill=\"#84aca1\" stroke=\"#263541\" stroke-width=\"4\"/><rect x=\"779\" y=\"245\" width=\"52\" height=\"71\" rx=\"10\" fill=\"#b5a47d\" stroke=\"#253443\" stroke-width=\"5\"/><ellipse cx=\"805\" cy=\"246\" rx=\"27\" ry=\"10\" fill=\"#d0bf91\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M586 731 H1000\" fill=\"none\" stroke=\"#d6c296\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"587\" cy=\"414\" rx=\"5\" ry=\"5\" fill=\"#d6c296\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"1014\" cy=\"414\" rx=\"5\" ry=\"5\" fill=\"#d6c296\" stroke=\"none\" stroke-width=\"4\"/><rect x=\"741\" y=\"665\" width=\"124\" height=\"42\" rx=\"8\" fill=\"#3c545f\" stroke=\"#253443\" stroke-width=\"5\"/><path d=\"M759 686 H781 M796 686 H819 M834 686 H849\" fill=\"none\" stroke=\"#7bc3bb\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/>", "raptor": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M895 578 Q1080 650 1260 552 Q1211 663 1025 695 L884 685Z\" fill=\"#718c61\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M715 634 Q671 698 669 762 L614 782 Q594 800 633 803 H718 L752 704Z\" fill=\"#536f55\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M639 442 Q727 432 764 525 Q802 546 881 550 C1001 554 1035 670 950 720 Q872 755 772 699 Q699 654 675 566Z\" fill=\"#8da776\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M675 484 Q710 560 748 613 Q790 671 869 690 Q791 721 735 660 Q693 608 665 521Z\" fill=\"#c1c394\" stroke=\"#253443\" stroke-width=\"0\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M927 638 Q985 682 936 741 L927 777 H974 Q1000 788 976 802 H867 Q849 794 866 775 L891 728 Q846 698 880 656Z\" fill=\"#7e9b6c\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M884 799 l7 -17 M913 799 l7 -17 M943 799 l7 -17\" fill=\"none\" stroke=\"#d9d2b1\" stroke-width=\"6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M745 542 L731 589 L692 606 L681 595 L707 576 L710 538\" fill=\"#7e9b6c\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M628 398 Q700 385 711 444 Q709 487 652 494 L538 488 Q510 480 518 450 L531 422Z\" fill=\"#97ae7b\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M524 469 Q585 481 651 465\" fill=\"none\" stroke=\"#435b4b\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"540\" cy=\"441\" rx=\"5\" ry=\"4\" fill=\"#3b5448\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"667\" cy=\"427\" rx=\"15\" ry=\"17\" fill=\"#e2c67e\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"667\" cy=\"428\" rx=\"6\" ry=\"7.5\" fill=\"#192b38\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"670\" cy=\"424\" rx=\"3\" ry=\"4\" fill=\"#e9eee3\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M649 411 Q663 401 681 409\" fill=\"none\" stroke=\"#536f55\" stroke-width=\"6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"789\" cy=\"562\" rx=\"8\" ry=\"6\" fill=\"#667f59\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"818\" cy=\"575\" rx=\"8\" ry=\"6\" fill=\"#667f59\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"854\" cy=\"580\" rx=\"8\" ry=\"6\" fill=\"#667f59\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"966\" cy=\"645\" rx=\"8\" ry=\"6\" fill=\"#667f59\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"1009\" cy=\"651\" rx=\"8\" ry=\"6\" fill=\"#667f59\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"1060\" cy=\"646\" rx=\"8\" ry=\"6\" fill=\"#667f59\" stroke=\"none\" stroke-width=\"4\"/>", "ice": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M555 782 L621 740 L990 740 L1058 782 L1020 810 H594Z\" fill=\"#628b9c\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M645 740 Q618 662 670 589 Q707 539 703 471 Q664 385 719 322 Q765 273 819 301 Q906 310 901 402 Q932 464 889 533 Q899 579 939 631 L1000 698 Q938 727 907 688 Q937 753 883 781 L834 750 L794 788 L752 748 L711 774Z\" fill=\"#a2d3d5\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M704 475 Q631 511 579 599 L613 624 Q664 566 717 558\" fill=\"#a2d3d5\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M897 472 Q960 485 1007 570 L976 592 Q927 544 881 549\" fill=\"#a2d3d5\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M727 330 L712 266 L760 299 L800 231 L828 296 L878 267 L868 335Z\" fill=\"#bfe1de\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M780 559 L810 508 L843 565 L807 618Z\" fill=\"#72adb8\" stroke=\"#253443\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M780 559 L807 575 L843 565 M807 575 V618\" fill=\"none\" stroke=\"#d2efea\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"761\" cy=\"414\" rx=\"17\" ry=\"23\" fill=\"#e7f3e9\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"841\" cy=\"414\" rx=\"17\" ry=\"23\" fill=\"#e7f3e9\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"765\" cy=\"416\" rx=\"8\" ry=\"10.0\" fill=\"#192b38\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"768\" cy=\"412\" rx=\"3\" ry=\"4\" fill=\"#e9eee3\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"837\" cy=\"416\" rx=\"8\" ry=\"10.0\" fill=\"#192b38\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"840\" cy=\"412\" rx=\"3\" ry=\"4\" fill=\"#e9eee3\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M781 453 Q803 470 824 451\" fill=\"none\" stroke=\"#4e828e\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M698 653 Q678 690 702 725 M910 635 Q938 665 963 682\" fill=\"none\" stroke=\"#c9e9e1\" stroke-width=\"7\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/>", "alien": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M672 750 L707 691 L760 703 L748 776 Q694 806 654 783Z\" fill=\"#758492\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M846 704 L898 691 L930 754 Q958 782 917 795 L858 778Z\" fill=\"#758492\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M708 488 Q662 502 630 600 L595 651 Q586 677 610 689 Q630 696 645 672 L688 621 L731 555Z\" fill=\"#a3b0b2\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M887 493 Q938 508 967 590 L997 638 Q1015 664 989 679 Q965 690 950 661 L915 618 L869 551Z\" fill=\"#a3b0b2\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"687\" y=\"484\" width=\"221\" height=\"247\" rx=\"57\" fill=\"#a7b4b8\" stroke=\"#253443\" stroke-width=\"5\"/><path d=\"M702 648 Q795 680 895 648 L895 708 Q801 753 702 708Z\" fill=\"#647c8a\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"735\" y=\"539\" width=\"127\" height=\"89\" rx=\"16\" fill=\"#546d7f\" stroke=\"#253443\" stroke-width=\"5\"/><ellipse cx=\"767\" cy=\"569\" rx=\"10\" ry=\"10\" fill=\"#7dc4b5\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"803\" cy=\"569\" rx=\"10\" ry=\"10\" fill=\"#d7b97b\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M754 604 H842\" fill=\"none\" stroke=\"#a5c3c3\" stroke-width=\"7\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"798\" cy=\"387\" rx=\"137\" ry=\"128\" fill=\"#5b7087\" stroke=\"#2c3b4a\" stroke-width=\"6\"/><ellipse cx=\"798\" cy=\"382\" rx=\"112\" ry=\"105\" fill=\"#8197a2\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M712 358 Q718 283 798 289 Q880 287 884 356 Q880 448 798 473 Q717 445 712 358Z\" fill=\"#a4ad92\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"752\" cy=\"372\" rx=\"22\" ry=\"30\" fill=\"#2e4755\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"844\" cy=\"372\" rx=\"22\" ry=\"30\" fill=\"#2e4755\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"758\" cy=\"364\" rx=\"6\" ry=\"8\" fill=\"#d6e4d8\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"850\" cy=\"364\" rx=\"6\" ry=\"8\" fill=\"#d6e4d8\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M778 427 Q799 437 820 426\" fill=\"none\" stroke=\"#506b63\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M703 323 Q730 283 766 279\" fill=\"none\" stroke=\"#d0ded6\" stroke-width=\"7\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"708\" y=\"474\" width=\"181\" height=\"25\" rx=\"10\" fill=\"#d1bd91\" stroke=\"#253443\" stroke-width=\"5\"/>", "owl": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M536 768 Q768 732 1062 775\" fill=\"none\" stroke=\"#3b3439\" stroke-width=\"35\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M536 762 Q768 730 1062 769\" fill=\"none\" stroke=\"#8f785b\" stroke-width=\"23\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M1008 761 L1063 712\" fill=\"none\" stroke=\"#8f785b\" stroke-width=\"14\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M730 662 L700 755 L799 733 L892 754 L864 652Z\" fill=\"#65596a\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M662 440 C647 345 686 315 732 335 Q799 307 865 335 Q914 307 937 373 L931 464 Q970 592 907 691 Q804 766 691 692 Q627 609 662 440Z\" fill=\"#927d81\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M676 461 Q622 553 682 673 Q705 689 724 681 L729 501Z\" fill=\"#655e75\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M916 460 Q969 553 909 675 Q887 690 869 680 L867 500Z\" fill=\"#655e75\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M724 510 Q798 477 872 510 L876 636 Q856 702 799 706 Q743 697 721 642Z\" fill=\"#bba99a\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"738\" cy=\"432\" rx=\"67\" ry=\"75\" fill=\"#d2c3aa\" stroke=\"#685965\" stroke-width=\"4\"/><ellipse cx=\"858\" cy=\"432\" rx=\"67\" ry=\"75\" fill=\"#d2c3aa\" stroke=\"#685965\" stroke-width=\"4\"/><ellipse cx=\"741\" cy=\"435\" rx=\"33\" ry=\"37\" fill=\"#d9bb75\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"855\" cy=\"435\" rx=\"33\" ry=\"37\" fill=\"#d9bb75\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"745\" cy=\"435\" rx=\"17\" ry=\"21.25\" fill=\"#192b38\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"748\" cy=\"431\" rx=\"3\" ry=\"4\" fill=\"#e9eee3\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"851\" cy=\"435\" rx=\"17\" ry=\"21.25\" fill=\"#192b38\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"854\" cy=\"431\" rx=\"3\" ry=\"4\" fill=\"#e9eee3\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M782 468 L798 498 L815 468 L798 453Z\" fill=\"#c4a16a\" stroke=\"#253443\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M711 733 V756 M729 733 V755 M747 733 V754 M851 733 V754 M869 733 V755 M887 733 V757\" fill=\"none\" stroke=\"#cfba8c\" stroke-width=\"7\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M750 560 q10 19 20 0\" fill=\"none\" stroke=\"#98857b\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M790 560 q10 19 20 0\" fill=\"none\" stroke=\"#98857b\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M830 560 q10 19 20 0\" fill=\"none\" stroke=\"#98857b\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M769 603 q10 19 20 0\" fill=\"none\" stroke=\"#98857b\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M809 603 q10 19 20 0\" fill=\"none\" stroke=\"#98857b\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M790 648 q10 19 20 0\" fill=\"none\" stroke=\"#98857b\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/>", "spider": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M716 530 L603 429 L533 488\" fill=\"none\" stroke=\"#263140\" stroke-width=\"25\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M716 530 L603 429 L533 488\" fill=\"none\" stroke=\"#81728b\" stroke-width=\"16\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M704 570 L547 532 L465 613\" fill=\"none\" stroke=\"#263140\" stroke-width=\"25\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M704 570 L547 532 L465 613\" fill=\"none\" stroke=\"#81728b\" stroke-width=\"16\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M704 612 L543 639 L483 745\" fill=\"none\" stroke=\"#263140\" stroke-width=\"25\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M704 612 L543 639 L483 745\" fill=\"none\" stroke=\"#81728b\" stroke-width=\"16\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M728 649 L631 732 L616 798\" fill=\"none\" stroke=\"#263140\" stroke-width=\"25\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M728 649 L631 732 L616 798\" fill=\"none\" stroke=\"#81728b\" stroke-width=\"16\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M884 530 L997 429 L1067 488\" fill=\"none\" stroke=\"#263140\" stroke-width=\"25\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M884 530 L997 429 L1067 488\" fill=\"none\" stroke=\"#81728b\" stroke-width=\"16\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M896 570 L1053 532 L1135 613\" fill=\"none\" stroke=\"#263140\" stroke-width=\"25\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M896 570 L1053 532 L1135 613\" fill=\"none\" stroke=\"#81728b\" stroke-width=\"16\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M896 612 L1057 639 L1117 745\" fill=\"none\" stroke=\"#263140\" stroke-width=\"25\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M896 612 L1057 639 L1117 745\" fill=\"none\" stroke=\"#81728b\" stroke-width=\"16\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M872 649 L969 732 L984 798\" fill=\"none\" stroke=\"#263140\" stroke-width=\"25\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M872 649 L969 732 L984 798\" fill=\"none\" stroke=\"#81728b\" stroke-width=\"16\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"800\" cy=\"480\" rx=\"132\" ry=\"149\" fill=\"#776985\" stroke=\"#293340\" stroke-width=\"5\"/><path d=\"M751 382 Q800 351 849 382 L872 445 L800 489 L728 445Z\" fill=\"#94829d\" stroke=\"#253443\" stroke-width=\"0\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"800\" cy=\"615\" rx=\"112\" ry=\"94\" fill=\"#a08a9e\" stroke=\"#293340\" stroke-width=\"5\"/><ellipse cx=\"760\" cy=\"604\" rx=\"26\" ry=\"30\" fill=\"#e1d9be\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"840\" cy=\"604\" rx=\"26\" ry=\"30\" fill=\"#e1d9be\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"765\" cy=\"606\" rx=\"12\" ry=\"15.0\" fill=\"#192b38\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"768\" cy=\"602\" rx=\"3\" ry=\"4\" fill=\"#e9eee3\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"835\" cy=\"606\" rx=\"12\" ry=\"15.0\" fill=\"#192b38\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"838\" cy=\"602\" rx=\"3\" ry=\"4\" fill=\"#e9eee3\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"730\" cy=\"578\" rx=\"8\" ry=\"8\" fill=\"#283443\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"870\" cy=\"578\" rx=\"8\" ry=\"8\" fill=\"#283443\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M776 652 Q800 670 824 652\" fill=\"none\" stroke=\"#51445e\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/>", "golem": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M682 658 L760 664 L749 758 L770 794 L652 794 L663 750Z\" fill=\"#7a8b84\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M840 664 L918 658 L937 750 L950 794 L831 794 L851 758Z\" fill=\"#71817e\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M674 442 L624 455 L578 563 L600 601 L641 581 L698 495Z\" fill=\"#80948a\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M600 590 L638 588 L646 657 L619 697 L572 672 L572 629Z\" fill=\"#879b90\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M926 442 L976 455 L1022 563 L1000 601 L959 581 L902 495Z\" fill=\"#718783\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M1000 590 L962 588 L954 657 L981 697 L1028 672 L1028 629Z\" fill=\"#81958d\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M697 418 L900 418 L950 506 L912 667 L849 704 L741 704 L674 663 L650 509Z\" fill=\"#92a398\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M697 418 L750 475 L718 597 L674 663 L650 509Z\" fill=\"#738a82\" stroke=\"#253443\" stroke-width=\"0\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M900 418 L850 475 L883 589 L912 667 L950 506Z\" fill=\"#718882\" stroke=\"#253443\" stroke-width=\"0\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M723 322 L745 267 L850 267 L885 315 L871 405 L822 435 L759 420 L723 378Z\" fill=\"#a3b2a3\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M746 278 L774 316 L749 350 L729 326Z\" fill=\"#bac4b0\" stroke=\"#253443\" stroke-width=\"0\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M748 354 L776 359 M823 359 L851 350\" fill=\"none\" stroke=\"#416769\" stroke-width=\"9\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M771 392 L824 392\" fill=\"none\" stroke=\"#62766e\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M770 516 L800 485 L833 518 L801 556Z\" fill=\"#7dc0b2\" stroke=\"#253443\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M790 556 L775 597 L800 616 L786 651\" fill=\"none\" stroke=\"#526c69\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M705 733 L723 753 M881 727 L898 752 M692 791 V773 M719 792 V774 M871 792 V774 M899 792 V773\" fill=\"none\" stroke=\"#526c69\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/>", "swan": "<g stroke-linejoin=\"round\" stroke-linecap=\"round\">\n<ellipse cx=\"805\" cy=\"772\" rx=\"325\" ry=\"48\" fill=\"#284c66\"/>\n<path d=\"M510 788 Q802 837 1110 785 M547 760 Q582 753 610 758 M1040 762 Q1074 757 1105 765\" fill=\"none\" stroke=\"#527d8e\" stroke-width=\"5\"/>\n<!-- One continuous outer contour: head, neck, breast, body and tail. -->\n<path d=\"M575 350 C582 323 615 314 639 325 C667 339 671 367 651 395 L613 443 C569 495 557 556 587 608 C609 648 626 669 653 687 C665 734 749 755 850 751 C970 748 1046 700 1115 609 L1024 650 C978 594 881 573 785 589 C742 595 721 605 702 615 C670 591 640 550 649 513 C658 477 701 448 721 401 C752 330 705 276 640 273 C580 269 544 301 540 339Z\" fill=\"#e2e6d7\" stroke=\"#293b46\" stroke-width=\"5\"/>\n<!-- Soft underside shading follows the breast without a seam at the neck. -->\n<path d=\"M592 568 C607 628 653 653 707 665 Q790 731 946 708 C895 739 802 746 735 728 C660 710 615 654 592 602Z\" fill=\"#c5d4ce\"/>\n<!-- Folded wing, blended into the body; only feather tips receive thin contours. -->\n<path d=\"M704 640 C752 605 845 597 951 624 C918 638 909 654 900 674 C852 712 775 713 707 683 C737 683 756 674 768 662 Q730 666 704 640Z\" fill=\"#cbd8d0\"/>\n<path d=\"M747 644 Q820 615 918 631 M760 660 Q828 636 898 645 M775 677 Q832 657 878 661 M803 691 Q842 678 860 675\" fill=\"none\" stroke=\"#a7beb9\" stroke-width=\"3.5\"/>\n<path d=\"M982 690 Q1027 668 1065 644\" fill=\"none\" stroke=\"#b7ccc4\" stroke-width=\"4\"/>\n<!-- Black facial marking ends at the beak root. -->\n<path d=\"M572 332 Q584 333 590 349 L574 367 L558 357 L559 340Z\" fill=\"#34434a\"/>\n<path d=\"M559 340 L528 349 L505 365 L568 360Z\" fill=\"#cd9b63\" stroke=\"#293b46\" stroke-width=\"3\"/>\n<path d=\"M505 365 L566 360\" fill=\"none\" stroke=\"#6d6255\" stroke-width=\"2\"/>\n<ellipse cx=\"607\" cy=\"334\" rx=\"6\" ry=\"7\" fill=\"#263640\"/>\n<circle cx=\"609\" cy=\"332\" r=\"2\" fill=\"#f4f3df\"/>\n<path d=\"M565 790 Q593 797 623 792 M1002 791 Q1043 801 1082 790\" fill=\"none\" stroke=\"#8aafb6\" stroke-width=\"4\"/>\n</g>", "hedgehog": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M570 677 L534.0 638.0 L550.3 607.1 L543.7 573.0 L568.6 547.3 L572.2 512.5 L604.0 493.7 L617.5 460.5 L654.0 450.0 L676.5 420.6 L715.3 419.0 L745.2 395.6 L783.6 403.0 L819.0 387.0 L854.4 403.0 L892.8 395.6 L922.7 419.0 L961.5 420.6 L984.0 450.0 L1020.5 460.5 L1034.0 493.7 L1065.8 512.5 L1069.4 547.3 L1094.3 573.0 L1087.7 607.1 L1104.0 638.0 L1064 699 Q1010 771 729 750Z\" fill=\"#71646a\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"738\" cy=\"761\" rx=\"47\" ry=\"20\" fill=\"#a58b77\" stroke=\"#303541\" stroke-width=\"4\"/><ellipse cx=\"969\" cy=\"761\" rx=\"47\" ry=\"20\" fill=\"#a58b77\" stroke=\"#303541\" stroke-width=\"4\"/><path d=\"M717 564 Q656 530 614 570 L559 637 L507 664 Q491 682 522 696 L620 720 Q678 756 739 718 Q783 671 748 615Z\" fill=\"#bdab8b\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"699\" cy=\"573\" rx=\"27\" ry=\"32\" fill=\"#a48e7b\" stroke=\"#45414a\" stroke-width=\"4\"/><ellipse cx=\"698\" cy=\"574\" rx=\"14\" ry=\"19\" fill=\"#c6ab94\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"512\" cy=\"672\" rx=\"15\" ry=\"12\" fill=\"#2e3944\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"615\" cy=\"625\" rx=\"11\" ry=\"13.75\" fill=\"#192b38\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"618\" cy=\"621\" rx=\"3\" ry=\"4\" fill=\"#e9eee3\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M544 690 Q574 701 597 684\" fill=\"none\" stroke=\"#776653\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M771 521 L782 483 L796 519\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M827 509 L838 471 L852 507\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M890 534 L901 496 L915 532\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M735 579 L746 541 L760 577\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M798 573 L809 535 L823 571\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M864 585 L875 547 L889 583\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M948 593 L959 555 L973 591\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M766 647 L777 609 L791 645\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M834 641 L845 603 L859 639\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M910 655 L921 617 L935 653\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M988 686 L999 648 L1013 684\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M804 713 L815 675 L829 711\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M875 718 L886 680 L900 716\" fill=\"none\" stroke=\"#a18b82\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/>", "whale": "<ellipse cx=\"800\" cy=\"780\" rx=\"420\" ry=\"55\" fill=\"#24445e\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M437 800 Q813 858 1172 792\" fill=\"none\" stroke=\"#436b7d\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M1052 578 Q1159 587 1203 527 L1203 465 Q1256 476 1272 522 Q1310 488 1350 507 L1308 565 Q1257 598 1198 579 L1088 661Z\" fill=\"#568b9b\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M474 593 C493 478 663 447 836 473 Q987 490 1093 591 L1104 653 Q1004 739 805 756 C614 774 450 720 474 593Z\" fill=\"#608fa0\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M481 658 Q671 724 879 693 Q986 676 1090 622 L1104 653 Q1004 739 805 756 Q563 780 481 683Z\" fill=\"#b5c8c2\" stroke=\"#253443\" stroke-width=\"0\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M766 636 Q823 687 931 722 Q893 772 817 739 Q766 713 738 672Z\" fill=\"#467785\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M504 653 Q559 669 627 659\" fill=\"none\" stroke=\"#304e60\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"562\" cy=\"594\" rx=\"11\" ry=\"13.75\" fill=\"#192b38\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"565\" cy=\"590\" rx=\"3\" ry=\"4\" fill=\"#e9eee3\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M531 689 Q546 710 580 721 M568 696 Q589 723 624 731 M608 703 Q633 730 668 736\" fill=\"none\" stroke=\"#8ba6a7\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M682 481 Q653 431 663 386 M682 481 Q699 426 730 412\" fill=\"none\" stroke=\"#85b8bf\" stroke-width=\"7\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"662\" cy=\"369\" rx=\"8\" ry=\"13\" fill=\"#9dcad0\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"739\" cy=\"395\" rx=\"7\" ry=\"11\" fill=\"#9dcad0\" stroke=\"none\" stroke-width=\"4\"/>", "lantern": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M657 756 H943 L974 797 H626Z\" fill=\"#758386\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"688\" y=\"722\" width=\"224\" height=\"40\" rx=\"12\" fill=\"#baa476\" stroke=\"#253443\" stroke-width=\"5\"/><path d=\"M676 444 L719 403 H881 L924 444 L905 722 H695Z\" fill=\"#6a8488\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M714 458 H886 L871 705 H729Z\" fill=\"#30495b\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M737 473 H863 L850 685 H750Z\" fill=\"#9fbdad\" stroke=\"#253443\" stroke-width=\"0\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M714 458 L737 473 L750 685 L729 705Z\" fill=\"#547b81\" stroke=\"#253443\" stroke-width=\"0\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M886 458 L863 473 L850 685 L871 705Z\" fill=\"#547b81\" stroke=\"#253443\" stroke-width=\"0\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"757\" y=\"656\" width=\"86\" height=\"36\" rx=\"9\" fill=\"#b8a16e\" stroke=\"#253443\" stroke-width=\"5\"/><path d=\"M800 651 C744 625 775 588 787 555 Q788 595 810 592 Q827 570 818 539 C877 596 846 636 800 651Z\" fill=\"#d9b773\" stroke=\"#253443\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M800 644 Q778 619 805 600 Q821 627 800 644Z\" fill=\"#f0dda0\" stroke=\"#253443\" stroke-width=\"0\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M752 481 L765 567 M775 481 L783 522\" fill=\"none\" stroke=\"#d2dfc2\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M676 444 L703 418 H897 L924 444Z\" fill=\"#c4ad7a\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M719 403 L747 356 H853 L881 403Z\" fill=\"#788a8b\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"760\" y=\"328\" width=\"80\" height=\"31\" rx=\"8\" fill=\"#c4ad7a\" stroke=\"#253443\" stroke-width=\"5\"/><path d=\"M773 327 C692 271 738 218 800 218 C863 218 909 271 827 327\" fill=\"none\" stroke=\"#293b46\" stroke-width=\"15\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M773 327 C692 271 738 218 800 218 C863 218 909 271 827 327\" fill=\"none\" stroke=\"#a6b6aa\" stroke-width=\"8\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M695 448 L711 723 M905 448 L889 723\" fill=\"none\" stroke=\"#d0b887\" stroke-width=\"10\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/>", "book": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M514 481 Q644 435 797 500 Q944 435 1085 481 L1123 751 Q948 718 801 782 Q650 720 477 751Z\" fill=\"#665b7c\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M522 474 Q670 440 799 500 Q941 440 1077 474 L1107 728 Q950 700 800 760 Q649 701 493 728Z\" fill=\"#b4b4a0\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M530 452 Q673 425 799 487 L799 739 Q654 680 506 706Z\" fill=\"#e1d6b6\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M799 487 Q938 425 1068 452 L1091 706 Q946 681 799 739Z\" fill=\"#cec7ab\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M799 490 V736\" fill=\"none\" stroke=\"#968c78\" stroke-width=\"7\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M515 716 Q651 695 787 750 M812 750 Q948 696 1099 716\" fill=\"none\" stroke=\"#f1dfb6\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M919 694 L947 693 L948 786 L931 773 L917 792Z\" fill=\"#9e6d79\" stroke=\"#253443\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M562 503 Q644 495 739 533\" fill=\"none\" stroke=\"#a79d86\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M562 535 Q644 527 739 565\" fill=\"none\" stroke=\"#a79d86\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M562 567 Q644 559 739 597\" fill=\"none\" stroke=\"#a79d86\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M562 599 Q644 591 739 629\" fill=\"none\" stroke=\"#a79d86\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M562 631 Q644 623 739 661\" fill=\"none\" stroke=\"#a79d86\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"945\" cy=\"564\" rx=\"52\" ry=\"52\" fill=\"none\" stroke=\"#8a8193\" stroke-width=\"4\"/><path d=\"M945 517 L958 549 L992 551 L966 574 L975 608 L945 588 L915 608 L924 574 L898 551 L932 549Z\" fill=\"none\" stroke=\"#8a8193\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M880 658 Q941 642 1024 647\" fill=\"none\" stroke=\"#9b9381\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"879\" cy=\"485\" rx=\"5\" ry=\"5\" fill=\"#a99771\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"1019\" cy=\"618\" rx=\"5\" ry=\"5\" fill=\"#a99771\" stroke=\"none\" stroke-width=\"4\"/>", "musicbox": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M574 621 L967 621 L1040 574 V737 L966 798 H574Z\" fill=\"#826782\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M574 621 L967 621 V798 H574Z\" fill=\"#a08198\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M967 621 L1040 574 V737 L967 798Z\" fill=\"#685973\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M574 621 L644 575 H1040 L967 621Z\" fill=\"#c4a887\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M600 616 L649 586 H1006 L958 616Z\" fill=\"#3b3d54\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M578 572 L547 350 Q761 297 979 350 L1008 572Z\" fill=\"#a3859c\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M597 545 L576 369 Q761 329 955 369 L978 545Z\" fill=\"#605e79\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M613 528 L596 386 Q767 354 937 386 L954 528Z\" fill=\"#8797a2\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M620 401 Q688 381 730 388\" fill=\"none\" stroke=\"#c1c8be\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"598\" y=\"731\" width=\"344\" height=\"36\" rx=\"9\" fill=\"#c3a67d\" stroke=\"#253443\" stroke-width=\"5\"/><rect x=\"748\" y=\"651\" width=\"58\" height=\"45\" rx=\"9\" fill=\"#c8ad7e\" stroke=\"#253443\" stroke-width=\"5\"/><ellipse cx=\"777\" cy=\"672\" rx=\"6\" ry=\"8\" fill=\"#554558\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"804\" cy=\"595\" rx=\"103\" ry=\"16\" fill=\"#c7b786\" stroke=\"#3b3e4b\" stroke-width=\"4\"/><rect x=\"730\" y=\"565\" width=\"149\" height=\"28\" rx=\"8\" fill=\"#b6a879\" stroke=\"#253443\" stroke-width=\"5\"/><path d=\"M749 570 V587 M765 570 V587 M781 570 V587 M797 570 V587 M813 570 V587 M829 570 V587 M845 570 V587\" fill=\"none\" stroke=\"#766b60\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M815 565 V442 L871 427 V482\" fill=\"none\" stroke=\"#d9c394\" stroke-width=\"7\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"801\" cy=\"558\" rx=\"17\" ry=\"11\" fill=\"#d9c394\" stroke=\"#3b3e4b\" stroke-width=\"3\"/><ellipse cx=\"857\" cy=\"483\" rx=\"17\" ry=\"11\" fill=\"#d9c394\" stroke=\"#3b3e4b\" stroke-width=\"3\"/><path d=\"M1040 671 L1080 648 L1095 665\" fill=\"none\" stroke=\"#c1aa7f\" stroke-width=\"9\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"1098\" cy=\"671\" rx=\"10\" ry=\"18\" fill=\"#8797a2\" stroke=\"#354351\" stroke-width=\"4\"/><ellipse cx=\"617\" cy=\"748\" rx=\"5\" ry=\"5\" fill=\"#e0c596\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"926\" cy=\"748\" rx=\"5\" ry=\"5\" fill=\"#e0c596\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"611\" cy=\"660\" rx=\"5\" ry=\"5\" fill=\"#e0c596\" stroke=\"none\" stroke-width=\"4\"/><ellipse cx=\"930\" cy=\"660\" rx=\"5\" ry=\"5\" fill=\"#e0c596\" stroke=\"none\" stroke-width=\"4\"/>", "clock": "<ellipse cx=\"800\" cy=\"801\" rx=\"310\" ry=\"28\" fill=\"#080e1c\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M719 683 V777 M886 683 V777\" fill=\"none\" stroke=\"#ac9979\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M702 763 Q719 746 736 763 V809 Q719 827 702 809Z\" fill=\"#b09a6c\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M869 763 Q886 746 903 763 V809 Q886 827 869 809Z\" fill=\"#b09a6c\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M644 420 L800 298 L956 420 V707 L915 733 H685 L644 707Z\" fill=\"#956e53\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M674 438 L800 337 L926 438 V691 H674Z\" fill=\"#b28b62\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M610 423 L800 267 L991 423 L973 450 L800 311 L628 450Z\" fill=\"#69565a\" stroke=\"#253443\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M637 422 L800 289 L964 422\" fill=\"none\" stroke=\"#ad8c6a\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"763\" y=\"357\" width=\"74\" height=\"80\" rx=\"25\" fill=\"#3b3d48\" stroke=\"#253443\" stroke-width=\"5\"/><path d=\"M774 410 Q762 384 787 381 Q807 367 821 391 L834 404 L817 408 Q804 430 781 421Z\" fill=\"#c8b788\" stroke=\"#253443\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"807\" cy=\"391\" rx=\"3\" ry=\"3\" fill=\"#263342\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M820 394 L836 399 L821 404Z\" fill=\"#c79b63\" stroke=\"#253443\" stroke-width=\"2\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"800\" cy=\"541\" rx=\"100\" ry=\"100\" fill=\"#5d6670\" stroke=\"#3a3740\" stroke-width=\"4\"/><ellipse cx=\"800\" cy=\"541\" rx=\"86\" ry=\"86\" fill=\"#ded2ad\" stroke=\"#b4986b\" stroke-width=\"5\"/><path d=\"M800.00 469.00 L800.00 480.00\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M836.00 478.65 L830.50 488.17\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M862.35 505.00 L852.83 510.50\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M872.00 541.00 L861.00 541.00\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M862.35 577.00 L852.83 571.50\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M836.00 603.35 L830.50 593.83\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M800.00 613.00 L800.00 602.00\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M764.00 603.35 L769.50 593.83\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M737.65 577.00 L747.17 571.50\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M728.00 541.00 L739.00 541.00\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M737.65 505.00 L747.17 510.50\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M764.00 478.65 L769.50 488.17\" fill=\"none\" stroke=\"#766958\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M800 541 V490 M800 541 L843 561\" fill=\"none\" stroke=\"#4b525b\" stroke-width=\"7\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"800\" cy=\"541\" rx=\"7\" ry=\"7\" fill=\"#b09262\" stroke=\"none\" stroke-width=\"4\"/><rect x=\"768\" y=\"656\" width=\"64\" height=\"45\" rx=\"18\" fill=\"#4d4d56\" stroke=\"#253443\" stroke-width=\"5\"/><path d=\"M800 661 V680\" fill=\"none\" stroke=\"#b89d68\" stroke-width=\"6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"800\" cy=\"686\" rx=\"17\" ry=\"17\" fill=\"#c4ac77\" stroke=\"none\" stroke-width=\"4\"/><path d=\"M689 707 H911\" fill=\"none\" stroke=\"#d0ac7c\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/>"};
const REDRAW_REGIONS = {"mechanism":[[0,0,698,524],[698,0,97,524],[795,0,83,524],[878,0,722,524],[0,524,673,192],[673,524,102,192],[775,524,115,192],[890,524,710,192],[0,716,661,184],[661,716,133,184],[794,716,133,184],[927,716,673,184]],"raptor":[[0,0,645,603],[645,0,65,603],[710,0,109,603],[819,0,781,603],[0,603,811,92],[811,603,116,92],[927,603,117,92],[1044,603,556,92],[0,695,699,205],[699,695,114,205],[813,695,100,205],[913,695,687,205]],"ice":[[0,0,746,530],[746,0,55,530],[801,0,55,530],[856,0,744,530],[0,530,706,166],[706,530,85,166],[791,530,86,166],[877,530,723,166],[0,696,692,204],[692,696,108,204],[800,696,107,204],[907,696,693,204]],"alien":[[0,0,739,488],[739,0,59,488],[798,0,60,488],[858,0,742,488],[0,488,720,171],[720,488,79,171],[799,488,79,171],[878,488,722,171],[0,659,708,241],[708,659,89,241],[797,659,92,241],[889,659,711,241]],"owl":[[0,0,729,515],[729,0,69,515],[798,0,68,515],[866,0,734,515],[0,515,729,190],[729,515,69,190],[798,515,69,190],[867,515,733,190],[0,705,686,195],[686,705,115,195],[801,705,117,195],[918,705,682,195]],"spider":[[0,0,730,517],[730,0,70,517],[800,0,71,517],[871,0,729,517],[0,517,702,130],[702,517,98,130],[800,517,99,130],[899,517,701,130],[0,647,678,253],[678,647,123,253],[801,647,123,253],[924,647,676,253]],"golem":[[0,0,746,519],[746,0,56,519],[802,0,56,519],[858,0,742,519],[0,519,695,139],[695,519,102,139],[797,519,103,139],[900,519,700,139],[0,658,700,242],[700,658,100,242],[800,658,100,242],[900,658,700,242]],"swan":[[0,0,630,627],[630,0,54,627],[684,0,157,627],[841,0,759,627],[0,627,718,109],[718,627,109,109],[827,627,110,109],[937,627,663,109],[0,736,660,164],[660,736,142,164],[802,736,141,164],[943,736,657,164]],"hedgehog":[[0,0,719,561],[719,0,101,561],[820,0,100,561],[920,0,680,561],[0,561,674,118],[674,561,140,118],[814,561,141,118],[955,561,645,118],[0,679,701,221],[701,679,112,221],[813,679,123,221],[936,679,664,221]],"whale":[[0,0,668,592],[668,0,144,592],[812,0,184,592],[996,0,604,592],[0,592,636,125],[636,592,155,125],[791,592,156,125],[947,592,653,125],[0,717,629,183],[629,717,166,183],[795,717,166,183],[961,717,639,183]],"lantern":[[0,0,751,525],[751,0,50,525],[801,0,49,525],[850,0,750,525],[0,525,743,187],[743,525,57,187],[800,525,58,187],[858,525,742,187],[0,712,709,188],[709,712,92,188],[801,712,92,188],[893,712,707,188]],"book":[[0,0,647,574],[647,0,152,574],[799,0,154,574],[953,0,647,574],[0,574,646,113],[646,574,154,113],[800,574,155,113],[955,574,645,113],[0,687,668,213],[668,687,135,213],[803,687,133,213],[936,687,664,213]],"musicbox":[[0,0,668,504],[668,0,104,504],[772,0,105,504],[877,0,723,504],[0,504,694,168],[694,504,113,168],[807,504,113,168],[920,504,680,168],[0,672,682,228],[682,672,121,228],[803,672,121,228],[924,672,676,228]],"clock":[[0,0,733,489],[733,0,68,489],[801,0,67,489],[868,0,732,489],[0,489,721,167],[721,489,79,167],[800,489,80,167],[880,489,720,167],[0,656,707,244],[707,656,94,244],[801,656,93,244],[894,656,706,244]]};
const REDRAW_ORDER = [8,11,9,10,4,7,0,3,5,6,1,2];
function redrawZones(key) {
 return REDRAW_ORDER.map((cell,i) => {
  const [x,y,w,h]=REDRAW_REGIONS[key][cell];
  return {ci:[10,0,2,1,9,3,11,4,8,6,7,5][i],r:420,
   art:`<defs><clipPath id="part-${key}-${i}"><rect x="${x-.5}" y="${y-.5}" width="${w+1}" height="${h+1}"/></clipPath></defs><g clip-path="url(#part-${key}-${i})">${REDRAW_ART[key]}</g>`};
 });
}

const PUZZLES = {

/* ---------- ДРАКОН ---------- */
dragon: {
  name: "Дракон",
  category: "creature",
  silhouette: "",
  zones: DRAGON_REGIONS.map((box, i) => ({
    ci: [10,0,1,2,3,9,4,5,8,6,11,7][i], r: 420,
    art: `<defs><clipPath id="dragon-part-${i}"><rect x="${box[0]-.5}" y="${box[1]-.5}" width="${box[2]+1}" height="${box[3]+1}"/></clipPath></defs><g clip-path="url(#dragon-part-${i})">${DRAGON_ART}</g>`
  })),
  extras: `<g>
    <g id="ex-d-print">
      <ellipse cx="1250" cy="838" rx="48" ry="30" fill="#1d2a44"/>
      <g fill="#131c33">
        <ellipse cx="1220" cy="814" rx="9" ry="14"/>
        <ellipse cx="1248" cy="806" rx="9" ry="14"/>
        <ellipse cx="1276" cy="814" rx="9" ry="14"/>
      </g>
    </g>
    <g id="ex-d-pebble"><ellipse cx="500" cy="816" rx="36" ry="21" fill="#232f4d"/></g>
    <g id="ex-d-mush">
      <path d="M300 782 v-26" stroke="#3a4a6e" stroke-width="6"/>
      <path id="ex-d-mush-cap" d="M274 758 a26 17 0 0 1 52 0 z" fill="#5fe0ff"/>
      <circle cx="300" cy="748" r="22" fill="#5fe0ff" opacity="0.16"/>
    </g>
    <g id="ex-d-crack" opacity="0">
      <path d="M1352 462 l26 42 l-20 32 l32 48" stroke="#080d1c" stroke-width="7" fill="none" stroke-linecap="round"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-d-print",  kind:"hide",  desc:"Исчез отпечаток лапы на полу." },
    { target:"ex-d-pebble", kind:"move",  transform:"translate(130,-26)", desc:"Камень сдвинулся вправо и выше." },
    { target:"ex-d-mush-cap", kind:"color", color:"#ff7fb0", desc:"Светящийся гриб стал розовым." },
    { target:"ex-d-crack",  kind:"show",  desc:"На правой стене появилась трещина." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите отпечаток лапы на полу пещеры.", target:"ex-d-print" },
    { q:"Покажите трещину на правой стене.", target:"ex-d-crack" },
    { q:"Найдите светящийся гриб у левой стены.", target:"ex-d-mush" },
    { q:"Где лежит одинокий камень?", target:"ex-d-pebble" },
    { q:"Покажите кристалл, который загорелся самым первым.", target:"crystal-0" },
    { q:"Покажите самый верхний кристалл.", target:"crystal-5" },
    { q:"Какой кристалл находится ближе всего к центру пещеры?", target:"crystal-2" }
  ]
},

/* ---------- СУНДУК ---------- */
chest: {
  name: "Сундук с сокровищами",
  category: "treasure",
  silhouette: "",
  zones: CHEST_PARTS.map((art, i) => ({ci:[10,8,2,7,3,11,9,6,0,1,4,5][i],r:420,art})),
  extras: `<g>
    <g id="ex-c-key">
      <circle cx="1240" cy="700" r="16" fill="none" stroke="#d8b13a" stroke-width="8"/>
      <path d="M1252 712 L1300 760" stroke="#d8b13a" stroke-width="9" stroke-linecap="round"/>
      <path d="M1290 750 L1306 766 M1300 760 L1316 776" stroke="#d8b13a" stroke-width="7" stroke-linecap="round"/>
    </g>
    <g id="ex-c-candle">
      <rect x="414" y="686" width="24" height="72" rx="6" fill="#d9cba8"/>
      <path d="M426 686 C412 668 426 650 426 650 C426 650 440 668 426 686 Z" fill="#ffb43c"/>
    </g>
    <g id="ex-c-tile"><rect x="1180" y="826" width="120" height="34" rx="6" fill="#243152"/></g>
    <g id="ex-c-web" opacity="0">
      <path d="M1380 160 C1420 190 1440 240 1440 300" fill="none" stroke="#4a5d84" stroke-width="3"/>
      <path d="M1380 160 C1400 220 1400 270 1380 320" fill="none" stroke="#4a5d84" stroke-width="3"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-c-key",  kind:"hide", desc:"Ключ исчез с пола." },
    { target:"ex-c-tile", kind:"move", transform:"translate(90,-40)", desc:"Каменная плита сдвинулась." },
    { target:"ex-c-candle", kind:"color", color:"#8fffd0", desc:"Пламя свечи стало зелёным." },
    { target:"ex-c-web",  kind:"show", desc:"В углу появилась паутина." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите ключ на полу пещеры.", target:"ex-c-key" },
    { q:"Покажите каменную плиту справа.", target:"ex-c-tile" },
    { q:"Найдите свечу у левой стены.", target:"ex-c-candle" },
    { q:"Покажите кристалл, который загорелся самым первым.", target:"crystal-0" },
    { q:"Где появилась паутина?", target:"ex-c-web" },
    { q:"Покажите кристалл в самом верхнем углу слева.", target:"crystal-11" },
    { q:"Какой кристалл находится у самого пола пещеры?", target:"crystal-2" }
  ]
},

/* ---------- МЕХАНИЗМ ---------- */
mechanism: {
  name: "Древний механизм",
  category: "machine",
  silhouette: "",
  zones: redrawZones("mechanism"),
  extras: `<g>
    <g id="ex-m-cog">
      <circle cx="1320" cy="828" r="30" fill="none" stroke="#6b7488" stroke-width="12" stroke-dasharray="12 9"/>
      <circle cx="1320" cy="828" r="24" fill="#454e63" stroke="#6b7488" stroke-width="3"/>
      <circle cx="1320" cy="828" r="8" fill="#232a3a"/>
    </g>
    <g id="ex-m-lamp">
      <path d="M420 780 L462 780 L454 828 L428 828 Z" fill="#3b4154"/>
      <circle cx="441" cy="792" r="14" fill="#5fe0ff"/>
    </g>
    <g id="ex-m-hammer">
      <rect x="1120" y="820" width="120" height="18" rx="7" fill="#8a6a3a"/>
      <rect x="1236" y="800" width="34" height="58" rx="8" fill="#5a6274"/>
    </g>
    <g id="ex-m-rune" opacity="0">
      <path d="M200 500 l34 0 M217 483 v34 M200 517 l34 0" stroke="#ffd24a" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-m-cog",    kind:"hide", desc:"Малая шестерня исчезла с пола." },
    { target:"ex-m-hammer", kind:"move", transform:"translate(-110,-30)", desc:"Каменный молот сдвинулся влево." },
    { target:"ex-m-lamp",   kind:"color", color:"#ff7fb0", desc:"Светильник сменил цвет на розовый." },
    { target:"ex-m-rune",   kind:"show", desc:"На левой стене загорелась руна." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите маленькую шестерню на полу.", target:"ex-m-cog" },
    { q:"Покажите каменный молот справа.", target:"ex-m-hammer" },
    { q:"Найдите светильник у левой стены.", target:"ex-m-lamp" },
    { q:"Где загорелась жёлтая руна?", target:"ex-m-rune" },
    { q:"Покажите кристалл, который загорелся самым первым.", target:"crystal-0" },
    { q:"Найдите кристалл возле большой шестерни.", target:"crystal-8" }
  ]
},

/* ---------- ХИЩНЫЙ ЯЩЕР ---------- */
raptor: {
  name: "Хищный ящер",
  category: "creature",
  silhouette: "",
  zones: redrawZones("raptor"),
  extras: `<g>
    <g id="ex-r-foot">
      <ellipse cx="1250" cy="835" rx="46" ry="28" fill="#1d2a44"/>
      <g fill="#131c33">
        <ellipse cx="1222" cy="812" rx="8" ry="13"/><ellipse cx="1250" cy="806" rx="8" ry="13"/><ellipse cx="1278" cy="812" rx="8" ry="13"/>
      </g>
    </g>
    <g id="ex-r-bone">
      <path d="M480 826 C500 806 540 806 560 826" stroke="#c9b48a" stroke-width="14" fill="none" stroke-linecap="round"/>
      <circle cx="470" cy="832" r="9" fill="#c9b48a"/><circle cx="570" cy="832" r="9" fill="#c9b48a"/>
    </g>
    <g id="ex-r-feather">
      <path d="M330 720 L340 770 L320 760 Z" fill="#5f7a3d"/>
      <path d="M300 720 C320 700 350 700 370 720" stroke="#5f7a3d" stroke-width="4" fill="none"/>
    </g>
    <g id="ex-r-crack" opacity="0">
      <path d="M1320 460 l20 40 l-14 30 l22 40" stroke="#080d1c" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-r-foot",  kind:"hide",  desc:"Исчез след трёхпалой лапы." },
    { target:"ex-r-bone",  kind:"move",  transform:"translate(60,-30)", desc:"Кость сдвинулась вправо." },
    { target:"ex-r-feather", kind:"color", color:"#ff7fb0", desc:"Перо стало розовым." },
    { target:"ex-r-crack", kind:"show",  desc:"На правой стене появилась трещина." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите след трёхпалой лапы на полу.", target:"ex-r-foot" },
    { q:"Покажите кость у левой стены.", target:"ex-r-bone" },
    { q:"Где лежит одинокое перо?", target:"ex-r-feather" },
    { q:"Покажите трещину на правой стене.", target:"ex-r-crack" },
    { q:"Покажите кристалл возле головы ящера.", target:"crystal-8" },
    { q:"Какой кристалл загорелся возле хвоста?", target:"crystal-0" }
  ]
},

/* ---------- ЛЕДЯНОЙ ДУХ ---------- */
ice: {
  name: "Ледяной дух",
  category: "creature",
  silhouette: "",
  zones: redrawZones("ice"),
  extras: `<g>
    <g id="ex-i-puddle">
      <ellipse cx="500" cy="820" rx="60" ry="20" fill="#2a4a6a"/>
      <ellipse cx="500" cy="818" rx="60" ry="18" fill="#5fa8d8" opacity="0.5"/>
    </g>
    <g id="ex-i-flake">
      <path d="M1200 800 L1214 826 L1200 852 L1186 826 Z" fill="#cdf6ff"/>
      <path d="M1200 800 L1214 826 L1200 826 Z" fill="#e8fbff"/>
    </g>
    <g id="ex-i-stone"><ellipse cx="300" cy="820" rx="34" ry="18" fill="#2a3a55"/></g>
    <g id="ex-i-crack" opacity="0">
      <path d="M1340 480 l22 44 l-16 32 l24 44" stroke="#080d1c" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-i-puddle", kind:"color", color:"#ff7fb0", desc:"Лужица стала розовой." },
    { target:"ex-i-flake", kind:"hide", desc:"Ледяная снежинка исчезла." },
    { target:"ex-i-stone", kind:"move", transform:"translate(80,-30)", desc:"Камень сдвинулся." },
    { target:"ex-i-crack", kind:"show", desc:"На стене появилась трещина." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите лужицу на полу пещеры.", target:"ex-i-puddle" },
    { q:"Покажите ледяную снежинку справа.", target:"ex-i-flake" },
    { q:"Где лежит серый камень?", target:"ex-i-stone" },
    { q:"Покажите трещину на правой стене.", target:"ex-i-crack" },
    { q:"Покажите кристалл возле левого рога духа.", target:"crystal-4" },
    { q:"Какой кристалл освещает правый рог?", target:"crystal-3" }
  ]
},

/* ---------- КОСМИЧЕСКИЙ ГОСТЬ ---------- */
alien: {
  name: "Космический гость",
  category: "creature",
  silhouette: "",
  zones: redrawZones("alien"),
  extras: `<g>
    <g id="ex-a-star">
      <path d="M1240 780 L1256 812 L1292 812 L1264 836 L1276 872 L1240 850 L1204 872 L1216 836 L1188 812 L1224 812 Z" fill="#ffd24a"/>
      <circle cx="1240" cy="820" r="40" fill="#ffd24a" opacity="0.15"/>
    </g>
    <g id="ex-a-disc">
      <ellipse cx="440" cy="800" rx="56" ry="18" fill="#5a4a7a"/>
      <ellipse cx="440" cy="794" rx="56" ry="18" fill="#8a6ab8"/>
      <ellipse cx="440" cy="794" rx="30" ry="9" fill="#c8a8ff" opacity="0.7"/>
    </g>
    <g id="ex-a-crystal">
      <path d="M320 820 L334 780 L348 820 L334 840 Z" fill="#c8a8ff"/>
      <path d="M320 820 L334 780 L334 840 Z" fill="#e8d4ff"/>
    </g>
    <g id="ex-a-rune" opacity="0">
      <path d="M1280 660 h44 M1302 640 v44 M1280 682 h44" stroke="#ffd24a" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-a-star",   kind:"hide",  desc:"Золотая звезда исчезла." },
    { target:"ex-a-disc",   kind:"move",  transform:"translate(90,-40)", desc:"Диск сдвинулся вправо и выше." },
    { target:"ex-a-crystal", kind:"color", color:"#7dff9a", desc:"Кристалл стал зелёным." },
    { target:"ex-a-rune",   kind:"show",  desc:"На правой стене зажглась руна." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите золотую звезду на полу.", target:"ex-a-star" },
    { q:"Покажите диск у левой стены.", target:"ex-a-disc" },
    { q:"Где стоит фиолетовый кристалл?", target:"ex-a-crystal" },
    { q:"Покажите руну на правой стене.", target:"ex-a-rune" },
    { q:"Покажите кристалл возле больших глаз.", target:"crystal-10" },
    { q:"Какой кристалл освещает левый глаз?", target:"crystal-10" }
  ]
},

/* ---------- СОВА ---------- */
owl: {
  name: "Сова",
  category: "creature",
  silhouette: "",
  zones: redrawZones("owl"),
  extras: `<g>
    <g id="ex-o-feather"><path d="M300 700 L330 760 L300 800 L280 760 Z" fill="#d4a860"/></g>
    <g id="ex-o-moth">
      <ellipse cx="1250" cy="780" rx="20" ry="14" fill="#a89060"/>
      <ellipse cx="1230" cy="780" rx="16" ry="10" fill="#c9a860" opacity="0.85"/>
      <ellipse cx="1270" cy="780" rx="16" ry="10" fill="#c9a860" opacity="0.85"/>
    </g>
    <g id="ex-o-acorn">
      <ellipse cx="420" cy="810" rx="18" ry="22" fill="#8a6a3a"/>
      <path d="M402 800 Q420 780 438 800 L438 806 L402 806 Z" fill="#6b4a1a"/>
    </g>
    <g id="ex-o-web" opacity="0">
      <path d="M1200 400 C1260 430 1290 480 1290 540" fill="none" stroke="#4a5d84" stroke-width="2"/>
      <path d="M1220 440 L1280 460 M1220 480 L1285 490 M1230 520 L1280 520" stroke="#4a5d84" stroke-width="2"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-o-feather", kind:"hide", desc:"Перо исчезло." },
    { target:"ex-o-moth", kind:"move", transform:"translate(80,-40)", desc:"Мотылёк перелетел вверх." },
    { target:"ex-o-acorn", kind:"color", color:"#5fe0ff", desc:"Жёлудь стал синим." },
    { target:"ex-o-web", kind:"show", desc:"В углу появилась паутина." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите перо на полу.", target:"ex-o-feather" },
    { q:"Покажите мотылька справа.", target:"ex-o-moth" },
    { q:"Где лежит жёлудь?", target:"ex-o-acorn" },
    { q:"Найдите паутину в углу.", target:"ex-o-web" },
    { q:"Покажите кристалл, который загорелся первым.", target:"crystal-0" },
    { q:"Какой кристалл освещает голову совы?", target:"crystal-2" }
  ]
},

/* ---------- ПАУК ---------- */
spider: {
  name: "Гигантский паук",
  category: "creature",
  silhouette: "",
  zones: redrawZones("spider"),
  extras: `<g>
    <g id="ex-sp-egg"><ellipse cx="380" cy="820" rx="14" ry="18" fill="#e8d4b0"/></g>
    <g id="ex-sp-fly">
      <ellipse cx="1220" cy="620" rx="12" ry="8" fill="#4a3550"/>
      <ellipse cx="1210" cy="618" rx="14" ry="6" fill="#a8c8e8" opacity="0.6"/>
      <ellipse cx="1230" cy="618" rx="14" ry="6" fill="#a8c8e8" opacity="0.6"/>
    </g>
    <g id="ex-sp-leaf"><path d="M400 700 C420 680 460 680 480 700 C460 720 420 720 400 700 Z" fill="#5a4a20"/></g>
    <g id="ex-sp-crack" opacity="0">
      <path d="M1350 500 l18 36 l-14 28 l22 40" stroke="#080d1c" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-sp-egg", kind:"hide", desc:"Одно яйцо исчезло." },
    { target:"ex-sp-fly", kind:"move", transform:"translate(-80,-60)", desc:"Муха перелетела влево вверх." },
    { target:"ex-sp-leaf", kind:"color", color:"#c9a227", desc:"Лист стал жёлтым." },
    { target:"ex-sp-crack", kind:"show", desc:"На правой стене появилась трещина." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите маленькое яйцо на полу.", target:"ex-sp-egg" },
    { q:"Покажите муху справа.", target:"ex-sp-fly" },
    { q:"Где лежит сухой лист?", target:"ex-sp-leaf" },
    { q:"Покажите трещину на правой стене.", target:"ex-sp-crack" },
    { q:"Найдите кристалл возле глаз паука.", target:"crystal-9" },
    { q:"Какой кристалл загорелся у паутины?", target:"crystal-0" }
  ]
},

/* ---------- ГОЛЕМ ---------- */
golem: {
  name: "Каменный голем",
  category: "creature",
  silhouette: "",
  zones: redrawZones("golem"),
  extras: `<g>
    <g id="ex-g-rune">
      <circle cx="1250" cy="820" r="30" fill="none" stroke="#ffd24a" stroke-width="5" stroke-dasharray="8 6"/>
      <path d="M1250 800 v40 M1230 820 h40" stroke="#ffd24a" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g id="ex-g-moss"><ellipse cx="420" cy="810" rx="46" ry="16" fill="#3d5a22"/></g>
    <g id="ex-g-chip"><path d="M340 780 L380 760 L390 800 Z" fill="#3a4154"/></g>
    <g id="ex-g-rift" opacity="0">
      <path d="M1300 400 L1320 460 L1300 520 L1330 580" stroke="#080d1c" stroke-width="7" fill="none" stroke-linecap="round"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-g-rune", kind:"hide", desc:"Руна на полу погасла." },
    { target:"ex-g-moss", kind:"move", transform:"translate(100,-40)", desc:"Мох сдвинулся вправо." },
    { target:"ex-g-chip", kind:"color", color:"#c9a227", desc:"Осколок стал золотым." },
    { target:"ex-g-rift", kind:"show", desc:"На правой стене появился разлом." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите руну на полу.", target:"ex-g-rune" },
    { q:"Покажите мох у левой стены.", target:"ex-g-moss" },
    { q:"Где лежит осколок?", target:"ex-g-chip" },
    { q:"Покажите разлом на стене.", target:"ex-g-rift" },
    { q:"Покажите кристалл возле глаз голема.", target:"crystal-11" },
    { q:"Какой кристалл загорелся первым?", target:"crystal-0" }
  ]
},

/* ---------- ЛЕБЕДЬ ---------- */
swan: {
  name: "Белый лебедь",
  category: "creature",
  silhouette: "",
  zones: redrawZones("swan"),
  extras: `<g>
    <g id="ex-s-lily">
      <ellipse cx="380" cy="820" rx="60" ry="18" fill="#3d5a22"/>
      <path d="M380 802 L400 820 L380 838 L360 820 Z" fill="#7dff9a"/>
    </g>
    <g id="ex-s-reed">
      <path d="M1240 850 L1230 700" stroke="#3d5a22" stroke-width="5"/>
      <ellipse cx="1230" cy="700" rx="6" ry="20" fill="#6b4a1a"/>
    </g>
    <g id="ex-s-fish">
      <ellipse cx="1180" cy="810" rx="30" ry="12" fill="#e0a020"/>
      <path d="M1150 810 L1130 800 L1130 820 Z" fill="#e0a020"/>
      <circle cx="1200" cy="808" r="3" fill="#241a05"/>
    </g>
    <g id="ex-s-drop" opacity="0">
      <ellipse cx="700" cy="270" rx="6" ry="10" fill="#a8e8ff"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-s-lily", kind:"color", color:"#c9a227", desc:"Кувшинка стала жёлтой." },
    { target:"ex-s-reed", kind:"move", transform:"translate(-60,0)", desc:"Камыш наклонился влево." },
    { target:"ex-s-fish", kind:"hide", desc:"Рыбка уплыла." },
    { target:"ex-s-drop", kind:"show", desc:"Сверху упала капля." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите кувшинку на воде.", target:"ex-s-lily" },
    { q:"Покажите камыш справа.", target:"ex-s-reed" },
    { q:"Где плавает рыбка?", target:"ex-s-fish" },
    { q:"Покажите падающую каплю.", target:"ex-s-drop" },
    { q:"Покажите кристалл возле клюва лебеди.", target:"crystal-7" },
    { q:"Какой кристалл у крыла?", target:"crystal-4" }
  ]
},

/* ---------- ЁЖИК ---------- */
hedgehog: {
  name: "Ёжик в тумане",
  category: "creature",
  silhouette: "",
  zones: redrawZones("hedgehog"),
  extras: `<g>
    <g id="ex-h-mush">
      <path d="M300 800 v-26" stroke="#d9cba8" stroke-width="8"/>
      <ellipse cx="300" cy="770" rx="26" ry="14" fill="#c94a2a"/>
      <circle cx="292" cy="766" r="3" fill="#fff"/><circle cx="308" cy="766" r="3" fill="#fff"/>
    </g>
    <g id="ex-h-leaf">
      <path d="M1180 820 C1220 800 1280 800 1320 820 C1280 840 1220 840 1180 820 Z" fill="#c9a227"/>
      <path d="M1180 820 L1320 820" stroke="#8a6a1a" stroke-width="2"/>
    </g>
    <g id="ex-h-snail">
      <ellipse cx="1100" cy="840" rx="28" ry="14" fill="#8a6a3a"/>
      <circle cx="1085" cy="828" r="16" fill="#c9a227"/>
      <path d="M1080 828 a 8 8 0 1 1 12 0" fill="none" stroke="#8a6a1a" stroke-width="2"/>
    </g>
    <g id="ex-h-drop" opacity="0">
      <ellipse cx="900" cy="200" rx="6" ry="10" fill="#a8e8ff"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-h-mush", kind:"hide", desc:"Грибок исчез." },
    { target:"ex-h-leaf", kind:"move", transform:"translate(-60,20)", desc:"Лист сдвинулся." },
    { target:"ex-h-snail", kind:"color", color:"#5fe0ff", desc:"Улитка стала синей." },
    { target:"ex-h-drop", kind:"show", desc:"Сверху упала капля." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите грибок у левой стены.", target:"ex-h-mush" },
    { q:"Покажите сухой лист справа.", target:"ex-h-leaf" },
    { q:"Где ползёт улитка?", target:"ex-h-snail" },
    { q:"Покажите падающую каплю.", target:"ex-h-drop" },
    { q:"Покажите кристалл возле яблока.", target:"crystal-3" },
    { q:"Какой кристалл освещает мордочку ежа?", target:"crystal-5" }
  ]
},

/* ---------- КИТ ---------- */
whale: {
  name: "Кит в подземном море",
  category: "creature",
  silhouette: "",
  zones: redrawZones("whale"),
  extras: `<g>
    <g id="ex-w-star">
      <path d="M1240 780 L1256 812 L1292 812 L1264 836 L1276 872 L1240 850 L1204 872 L1216 836 L1188 812 L1224 812 Z" fill="#ffd24a"/>
    </g>
    <g id="ex-w-anchor">
      <path d="M360 780 a 26 26 0 1 1 0 52" fill="none" stroke="#a8a8a8" stroke-width="6"/>
      <path d="M360 806 v-40 M340 770 h40" stroke="#a8a8a8" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
    <g id="ex-w-shell">
      <path d="M460 810 C470 790 490 790 500 810 C490 820 470 820 460 810 Z" fill="#e8b0a0"/>
      <path d="M462 810 L498 810" stroke="#8a5a4a" stroke-width="2"/>
    </g>
    <g id="ex-w-bubble" opacity="0">
      <circle cx="500" cy="400" r="14" fill="none" stroke="#a8e8ff" stroke-width="3"/>
      <circle cx="505" cy="395" r="3" fill="#e8fbff"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-w-star", kind:"hide", desc:"Морская звезда исчезла." },
    { target:"ex-w-anchor", kind:"move", transform:"translate(80,-30)", desc:"Якорь сдвинулся." },
    { target:"ex-w-shell", kind:"color", color:"#5fe0ff", desc:"Ракушка стала голубой." },
    { target:"ex-w-bubble", kind:"show", desc:"Появился пузырь воздуха." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите морскую звезду на дне.", target:"ex-w-star" },
    { q:"Покажите якорь слева.", target:"ex-w-anchor" },
    { q:"Где лежит ракушка?", target:"ex-w-shell" },
    { q:"Покажите поднимающийся пузырь.", target:"ex-w-bubble" },
    { q:"Покажите кристалл возле глаза кита.", target:"crystal-3" },
    { q:"Какой кристалл освещает фонтан?", target:"crystal-11" }
  ]
},

/* ---------- ВОЛШЕБНЫЙ ФОНАРЬ ---------- */
lantern: {
  name: "Волшебный фонарь",
  category: "treasure",
  silhouette: "",
  zones: redrawZones("lantern"),
  extras: `<g>
    <g id="ex-l-key">
      <circle cx="400" cy="780" r="12" fill="none" stroke="#d8b13a" stroke-width="6"/>
      <path d="M410 790 L440 820" stroke="#d8b13a" stroke-width="7" stroke-linecap="round"/>
    </g>
    <g id="ex-l-map">
      <rect x="1180" y="780" width="80" height="56" rx="4" fill="#d9cba8"/>
      <path d="M1200 800 L1250 810 M1220 810 L1240 830" stroke="#8a6a3a" stroke-width="2" fill="none"/>
    </g>
    <g id="ex-l-owl">
      <path d="M300 500 a 20 20 0 1 0 0 40 a 20 20 0 1 0 0 -40" fill="#4a3a20"/>
      <circle cx="295" cy="515" r="4" fill="#ffd24a"/>
      <circle cx="305" cy="515" r="4" fill="#ffd24a"/>
    </g>
    <g id="ex-l-mist" opacity="0">
      <ellipse cx="800" cy="820" rx="180" ry="30" fill="#5fa8d8" opacity="0.35"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-l-key", kind:"hide", desc:"Ключ исчез." },
    { target:"ex-l-map", kind:"move", transform:"translate(-80,-30)", desc:"Карта сдвинулась влево." },
    { target:"ex-l-owl", kind:"color", color:"#ff7fb0", desc:"Сова-статуя стала розовой." },
    { target:"ex-l-mist", kind:"show", desc:"У пола появился туман." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите ключ на полу.", target:"ex-l-key" },
    { q:"Покажите карту справа.", target:"ex-l-map" },
    { q:"Где сидит сова-статуя?", target:"ex-l-owl" },
    { q:"Покажите туман у пола.", target:"ex-l-mist" },
    { q:"Покажите кристалл, который зажёг фонарь.", target:"crystal-5" },
    { q:"Какой кристалл освещает ручку фонаря?", target:"crystal-4" }
  ]
},

/* ---------- КНИГА ЗАКЛИНАНИЙ ---------- */
book: {
  name: "Книга заклинаний",
  category: "treasure",
  silhouette: "",
  zones: redrawZones("book"),
  extras: `<g>
    <g id="ex-b-candle">
      <rect x="440" y="740" width="26" height="90" rx="6" fill="#d9cba8"/>
      <path d="M453 740 C440 720 453 700 453 700 C453 700 466 720 453 740 Z" fill="#ffb43c"/>
    </g>
    <g id="ex-b-quill">
      <path d="M1240 800 C1220 760 1240 720 1280 700 C1300 730 1290 780 1260 810 Z" fill="#e8f4ff"/>
      <path d="M1250 810 L1230 840" stroke="#8a6a3a" stroke-width="3" fill="none"/>
    </g>
    <g id="ex-b-skull">
      <circle cx="340" cy="800" r="20" fill="#e8e0cc"/>
      <circle cx="334" cy="796" r="4" fill="#241a05"/>
      <circle cx="348" cy="796" r="4" fill="#241a05"/>
    </g>
    <g id="ex-b-smoke" opacity="0">
      <path d="M800 340 C780 300 820 280 800 240 C780 200 820 180 800 140" stroke="#a8a8a8" stroke-width="4" fill="none" opacity="0.6"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-b-candle", kind:"hide", desc:"Свеча погасла." },
    { target:"ex-b-quill", kind:"move", transform:"translate(-80,-30)", desc:"Перо сдвинулось." },
    { target:"ex-b-skull", kind:"color", color:"#5fe0ff", desc:"Череп засветился голубым." },
    { target:"ex-b-smoke", kind:"show", desc:"Над книгой поднялся дым." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите свечу слева.", target:"ex-b-candle" },
    { q:"Покажите перо справа.", target:"ex-b-quill" },
    { q:"Где лежит череп?", target:"ex-b-skull" },
    { q:"Покажите дым над книгой.", target:"ex-b-smoke" },
    { q:"Покажите кристалл на застёжке книги.", target:"crystal-2" },
    { q:"Какой кристалл освещает страницу?", target:"crystal-6" }
  ]
},

/* ---------- ШКАТУЛКА ---------- */
musicbox: {
  name: "Музыкальная шкатулка",
  category: "treasure",
  silhouette: "",
  zones: redrawZones("musicbox"),
  extras: `<g>
    <g id="ex-mb-note1">
      <path d="M400 500 a 12 8 0 1 0 0 -16 a 12 8 0 1 0 0 16" fill="#5fe0ff"/>
      <path d="M410 490 v-30" stroke="#5fe0ff" stroke-width="3"/>
    </g>
    <g id="ex-mb-note2">
      <path d="M1200 560 a 12 8 0 1 0 0 -16 a 12 8 0 1 0 0 16" fill="#9a86ff"/>
      <path d="M1210 550 v-30" stroke="#9a86ff" stroke-width="3"/>
    </g>
    <g id="ex-mb-rose">
      <circle cx="350" cy="800" r="14" fill="#c94a8a"/>
      <circle cx="350" cy="800" r="6" fill="#ff90c0"/>
      <path d="M350 814 v30" stroke="#3d5a22" stroke-width="3"/>
    </g>
    <g id="ex-mb-dust" opacity="0">
      <g fill="#c9a227" opacity="0.65">
        <circle cx="700" cy="450" r="3"/><circle cx="800" cy="440" r="3"/><circle cx="900" cy="450" r="3"/>
      </g>
    </g>
  </g>`,
  changes: [
    { target:"ex-mb-note1", kind:"hide", desc:"Первая нотка исчезла." },
    { target:"ex-mb-note2", kind:"move", transform:"translate(-80,-40)", desc:"Вторая нотка улетела." },
    { target:"ex-mb-rose", kind:"color", color:"#ffd24a", desc:"Роза стала жёлтой." },
    { target:"ex-mb-dust", kind:"show", desc:"Появилась золотая пыль." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите первую нотку слева.", target:"ex-mb-note1" },
    { q:"Покажите вторую нотку справа.", target:"ex-mb-note2" },
    { q:"Где лежит роза?", target:"ex-mb-rose" },
    { q:"Покажите золотую пыль над шкатулкой.", target:"ex-mb-dust" },
    { q:"Покажите кристалл на крышке шкатулки.", target:"crystal-2" },
    { q:"Какой кристалл освещает балерину?", target:"crystal-7" }
  ]
},

/* ---------- ЧАСЫ С КУКУШКОЙ ---------- */
clock: {
  name: "Часы с кукушкой",
  category: "machine",
  silhouette: "",
  zones: redrawZones("clock"),
  extras: `<g>
    <g id="ex-cl-key">
      <circle cx="440" cy="820" r="14" fill="none" stroke="#d8b13a" stroke-width="6"/>
      <path d="M454 820 L510 820" stroke="#d8b13a" stroke-width="7" stroke-linecap="round"/>
      <path d="M500 810 v20 M510 810 v20" stroke="#d8b13a" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g id="ex-cl-cup">
      <path d="M1180 780 h60 v40 a 30 30 0 0 1 -60 0 z" fill="#d9cba8"/>
      <path d="M1240 800 a 18 12 0 0 1 0 24" fill="none" stroke="#d9cba8" stroke-width="6"/>
      <path d="M1190 760 C1185 740 1195 720 1190 700" stroke="#a8a8a8" stroke-width="3" fill="none"/>
      <path d="M1210 760 C1205 740 1215 720 1210 700" stroke="#a8a8a8" stroke-width="3" fill="none"/>
    </g>
    <g id="ex-cl-feather">
      <path d="M340 700 C300 680 280 640 290 600 C340 620 380 660 370 710 Z" fill="#e8f4ff"/>
      <path d="M290 600 L370 710" stroke="#8a9ab0" stroke-width="2" fill="none"/>
    </g>
    <g id="ex-cl-moon" opacity="0">
      <circle cx="1100" cy="300" r="40" fill="#ffe9a8"/>
      <circle cx="1085" cy="290" r="40" fill="#0f1732"/>
    </g>
  </g>`,
  changes: [
    { target:"ex-cl-key", kind:"hide", desc:"Ключ исчез." },
    { target:"ex-cl-cup", kind:"move", transform:"translate(-100,20)", desc:"Чашка сдвинулась влево." },
    { target:"ex-cl-feather", kind:"color", color:"#ff7fb0", desc:"Перо стало розовым." },
    { target:"ex-cl-moon", kind:"show", desc:"В окне появилась луна." },
    { kind:"crystal-off", desc:"Один из зажжённых кристаллов погас." }
  ],
  hints: [
    { q:"Найдите ключ завода на полу.", target:"ex-cl-key" },
    { q:"Покажите чашку справа.", target:"ex-cl-cup" },
    { q:"Где лежит перо?", target:"ex-cl-feather" },
    { q:"Покажите луну в окне.", target:"ex-cl-moon" },
    { q:"Покажите кристалл возле кукушки.", target:"crystal-2" },
    { q:"Какой кристалл освещает циферблат?", target:"crystal-5" }
  ]
}

};

/* ============================================================
   4. МАТЕРИАЛ ДЛЯ ЧТЕНИЯ
   ============================================================ */

const SYLLABLES = [
  "МА","МО","МУ","МЫ",
  "НА","НО","НУ","НЫ",
  "ПА","ПО","ПУ","ПЫ",
  "БА","БО","БУ","БЫ",
  "ТА","ТО","ТУ","ТЫ",
  "ДА","ДО","ДУ","ДЫ",
  "КА","КО","КУ","КЫ",
  "ГА","ГО","ГУ",
  "ВА","ВО","ВУ",
  "ФА","ФО","ФУ",
  "СА","СО","СУ","СЫ",
  "ЗА","ЗО","ЗУ",
  "ЛА","ЛО","ЛУ","ЛЫ",
  "РА","РО","РУ","РЫ",
  "ША","ШО","ШУ",
  "ЖА","ЖУ",
  "ЧА","ЧУ",
  "ХА","ХО",
  "ЦА","ЦУ"
];

const ALL_CONSONANTS = [
  "М","Н","П","Б","Т","Д","К","Г","В","Ф",
  "С","З","Л","Р","Ш","Ж","Ч","Щ","Х","Ц","Й"
];

const WORDS_SHORT = [
  "КОТ","РАК","СОК","ДОМ","ЛЕС","МИР","СЫР","НОС","РОТ","ЖУК",
  "ЛУК","ШАР","СОМ","КИТ","ЛЕВ","БЫК","СЫЧ","МАК","БАК","ЛАК",
  "ДУБ","ЗУБ","МЁД","ЛЁД","МЯЧ","ЁЖ","УС","ЖАР","ПАР","ШАГ",
  "ДЫМ","ТОК","БОР","САД","МЕЛ","СЕЛ","ПЁС","ВОЛ","ВЕС","ГОД",
  "ДЕД","ДЕНЬ","ПЕНЬ","КОНЬ","ЛОСЬ",
  "КРОТ","СЛОН","ТИГР","ЗУБР","СВЕТ","СНЕГ","ЛИСТ","КУСТ","МОСТ",
  "ГРОТ","ХЛЕБ","СТОЛ","СТУЛ","КРАН","ПЛОД","ФЛАГ","ДРУГ",
  "КРУГ","КЛЮЧ","ВРАЧ","ГРАЧ","ПЕЧЬ","РЕЧЬ",
  "О-СА","У-ХО","У-СЫ","ЛУ-НА","РЫ-БА","ГО-РА","РЕ-КА","РУ-КА","НО-ГА",
  "ЛИ-СА","КО-ЗА","НО-РА","РО-ГА","ЛА-ПА","ВА-ЗА","РО-ЗА","МИ-ЛА",
  "ЗИ-МА","ВЕС-НА","ТРА-ВА","ВО-ДА","ЗЕМ-ЛЯ","СКА-ЛА","СТЕ-НА","ЗВЕЗ-ДА",
  "ВОЛ-НА","ИГ-РА","ПИ-ЛА","СИ-ЛА","ЖА-РА","МА-МА","ПА-ПА","БА-БА",
  "СЕ-МЯ","ДЫ-НЯ","ВИ-ШНЯ","СЛИ-ВА","КА-ША","МУ-ХА","СО-ВА","ЖА-БА"
];

const WORDS_LONG = [
  "ТАЙ-НА","ТРО-ПА","КА-МЕНЬ","ФО-НАРЬ","СУН-ДУК","ДРА-КОН","ЛЕ-БЕДЬ",
  "КОС-МОС","ТАЙ-НИК","РУ-И-НЫ","СТА-ТУ-Я","КОР-ЗИ-НА","МА-ШИ-НА",
  "КАР-ТИ-НА","СО-БА-КА","ЛО-ШАДЬ","КО-РО-ВА","О-ВЦА","ЛИ-СИ-ЦА",
  "МЕД-ВЕДЬ","ВЕРБ-ЛЮД","О-ЛЕНЬ","КА-БАН","БАР-СУК","ХО-МЯК",
  "Е-НОТ","БО-БЁР","ГОР-НО-СТАЙ",
  "ПЛА-НЕ-ТА","КО-МЕ-ТА","РА-КЕ-ТА","ПЕ-ЩЕ-РА","ГЛУ-БИ-НА",
  "СО-КРО-ВИ-ЩЕ","ПЕ-ЩЕР-КА","СВЕТ-ЛЯ-ЧОК","ЗА-ГАД-КА","ОТ-КРЫ-ТИ-Е",
  "ЗЕР-КА-ЛО","ШКА-ТУЛ-КА","ЛА-БИ-РИНТ","ХРА-НИ-ТЕЛЬ","МЕ-ХА-НИЗМ",
  "КРИС-ТАЛЛ","АЛ-МАЗ","РУ-БИН","ТО-ПАЗ","САП-ФИР","ЖЕМ-ЧУГ","МО-НЕ-ТА",
  "КУВ-ШИН","ЛАН-ДЫШ",
  "ПОД-ЗЕ-МЕЛЬ-Е","ПУ-ТЕ-ШЕСТ-ВИ-Е","ИС-СЛЕ-ДО-ВА-ТЕЛЬ",
  "ПРИ-КЛЮ-ЧЕ-НИ-Е","ОТ-КРЫ-ВА-ТЕЛЬ","ХРА-НИ-ТЕЛЬ-НИ-ЦА"
];

const PHRASES = [
  "ТЁМНАЯ ПЕЩЕРА","ЯРКИЙ КРИСТАЛЛ","ТАЙНА В ГЛУБИНЕ","СВЕТ В ТЕМНОТЕ",
  "СТАРЫЙ СУНДУК","ДРЕВНИЙ МЕХАНИЗМ","КРИСТАЛЛ СВЕТИТ","КТО ЖИВЁТ В ПЕЩЕРЕ",
  "ЗАЖГИ ОГОНЁК","НАЙДИ ПОДСКАЗКУ","ВОТ ЭТО ЧУДО","СМЕЛЫЙ ИССЛЕДОВАТЕЛЬ",
  "ГЛУБОКАЯ НОРА","СИНИЙ СВЕТ","ЧТО ТАМ ВНУТРИ","СМОТРИ ВНИМАТЕЛЬНО",
  "ТИХО В ПЕЩЕРЕ","ЭТО ЗАГАДКА"
];

/* ============================================================
   5. БАНКИ ВОПРОСОВ
   ============================================================ */

const OBSERVE_BANK = {
  early: [
    "Что нового вы заметили в пещере?",
    "Какой участок сейчас самый светлый?",
    "Что появилось на месте, где только что зажёгся кристалл?",
    "Опишите, что вы видите на полу пещеры.",
    "Какая часть пещеры ещё тёмная?",
    "Покажите, где только что стало светлее.",
    "Что вы видите на стенах пещеры?",
    "Есть ли в пещере что-то живое? Как вы поняли?",
    "Сколько кристаллов уже горит?",
    "Какая деталь появилась самой первой?",
    "Как вы думаете, пещера большая или маленькая?"
  ],
  mid: [
    "Что нового появилось с прошлого раза?",
    "Какая деталь появилась последней?",
    "Что вы уже можете сказать о том, кто или что скрывается в глубине?",
    "Какие детали подсказывают, что это живое существо?",
    "Покажите самый яркий кристалл.",
    "Как вы думаете, что находится за этими камнями?",
    "Какая деталь кажется вам самой необычной?",
    "Что бы вы рассказали другу, если бы описывали эту пещеру?",
    "Какого размера тайна, по вашему мнению — большая или маленькая?",
    "Кто или что могло оставить такие следы?",
    "Что общего у всех появившихся деталей?",
    "Как вы думаете, эта тайна добрая или опасная?",
    "Что бы вы хотели увидеть следующим?",
    "Какая деталь смущает вас больше всего?"
  ],
  late: [
    "Какая подсказка помогла вам догадаться?",
    "Что вы уже точно знаете о том, кто в пещере?",
    "Как вы думаете, что случится, когда всё осветится?",
    "Какая деталь была самой важной?",
    "Почему эту деталь вы заметили только сейчас?",
    "Может ли это быть что-то другое? Объясните.",
    "Что общего у всех зажжённых кристаллов?",
    "Если бы вы делали подсказку для других, что бы вы показали?",
    "Что в этой пещере вас удивило больше всего?",
    "Готовы ли вы назвать разгадку?",
    "Что ещё нужно увидеть, чтобы быть уверенными?",
    "Какой была бы ваша версия, если бы вы не видели последнюю деталь?"
  ]
};

const GUESS_BANK = {
  early: [
    "Что ты заметил в пещере?",
    "На что это похоже?",
    "Какого размера, по твоему мнению, то, что спрятано?",
    "Это живое или нет? Почему ты так думаешь?",
    "Что бы ты хотел увидеть в пещере?",
    "Как ты думаешь, оно доброе или опасное?",
    "Если бы оно говорило, что бы оно сказало?",
    "Что в пещере могло бы принадлежать ему?",
    "Какого цвета, по-твоему, эта тайна?"
  ],
  mid: [
    "Какая деталь убедила тебя больше всего?",
    "Может ли это быть что-то другое?",
    "Что ещё нужно увидеть, чтобы убедиться?",
    "Как ты докажешь свою версию?",
    "Какие ещё существа имеют такие же части?",
    "Почему ты решил именно так?",
    "Что бы ты спросил у того, кто прячется?",
    "Как ты думаешь, оно большое или маленькое?",
    "Какое ещё объяснение можно придумать?",
    "Какая деталь не подходит к твоей версии?",
    "Сколько таких существ могло бы здесь жить?"
  ],
  late: [
    "Изменилось ли твоё мнение? Почему?",
    "Какая деталь оказалась решающей?",
    "Готов ли ты назвать разгадку?",
    "Что ты расскажешь родителям об этой пещере?",
    "Если бы это было существо, какой у него характер?",
    "Какая часть была самой узнаваемой?",
    "Что удивило тебя больше всего?",
    "Что бы ты добавил в пещеру, если бы рисовал её сам?",
    "Какая деталь была лишней? Почему?"
  ]
};