'use strict';

page('/', homeController.reveal);

page('/findart', findController.reveal);

page('/shareart', shareController.reveal);

//page('/loveart', loveController.reveal);
page('/loveart/:id', installationView.findObject, installationsController.index);

//page('/loveart/:id', loveController.reveal);

page();
