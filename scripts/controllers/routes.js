'use strict';

page('/', homeController.reveal);

page('/findart', installationsController.reveal);

page('/shareart', shareController.reveal);

page('/loveart', loveController.reveal);

page('/loveart/:id', loveController.reveal);

page();
