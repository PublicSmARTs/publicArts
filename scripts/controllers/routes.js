'use strict';

page('/', homeController.reveal);

page('/findart', findController.reveal);

// page('/findart', installationsController.loadByMedium, installationsController.index);

page('/shareart', shareController.reveal);

page('/loveart', loveController.reveal);

page('/loveart/:id', loveController.reveal);

page();
