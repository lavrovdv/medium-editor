/*global MediumEditor, describe, it, expect, spyOn,
         afterEach, beforeEach, selectElementContents,
         jasmine, fireEvent, console, tearDown,
         selectElementContentsAndFire */

describe('Pasting content', function () {
    'use strict';

    var multiLineTests = [
            {
                source: 'Google docs',
                paste: '<meta charset=\'utf-8\'><meta charset="utf-8"><b style="font-weight:normal;" id="docs-internal-guid-b1bb8bfe-f54c-2e1f-72e2-4c7608d2be70"><p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:bold;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bold</span></p><br><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:normal;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"></span><p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:normal;font-style:italic;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Italic</span></p><br><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:normal;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"></span><p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:bold;font-style:italic;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bold and Italic</span></p><br><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:normal;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"></span><p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:normal;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">A </span><a href="http://en.wikipedia.org/wiki/Link_(The_Legend_of_Zelda)" style="text-decoration:none;"><span style="font-size:15px;font-family:Arial;color:#1155cc;background-color:transparent;font-weight:normal;font-style:normal;font-variant:normal;text-decoration:underline;vertical-align:baseline;white-space:pre-wrap;">link</span></a><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:normal;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></p></b><br class="Apple-interchange-newline">',
                output: '<p><b>Bold</b></p><p><i>Italic</i></p><p><b><i>Bold and Italic</i></b></p><p>A <a href="http://en.wikipedia.org/wiki/Link_(The_Legend_of_Zelda)">link</a>.</p>'
            },
            {
                source: 'Inside editor',
                paste: '<meta charset=\'utf-8\'><p style="margin-bottom: 40px; color: rgb(0, 0, 0); font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px;"><b>Bold</b></p><p style="margin-bottom: 40px; color: rgb(0, 0, 0); font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px;"><i>Italic</i></p><p style="margin-bottom: 40px; color: rgb(0, 0, 0); font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px;"><b><i>Bold and Italic</i></b></p><p style="margin-bottom: 40px; color: rgb(0, 0, 0); font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px;">A<span class="Apple-converted-space"> </span><a href="http://en.wikipedia.org/wiki/Link_(The_Legend_of_Zelda)" style="color: black;">link</a>.</p>',
                output: '<p><b>Bold</b></p><p><i>Italic</i></p><p><b><i>Bold and Italic</i></b></p><p>A <a href="http://en.wikipedia.org/wiki/Link_(The_Legend_of_Zelda)">link</a>.</p>'
            },
            {
                source: 'Messy paragraphs with spaces',
                paste: '<meta charset=\'utf-8\'><p class="sub_buzz_desc" style="margin: 0px; padding: 0px 0px 12px; border: 0px; outline: 0px; font-size: 18px; background-color: rgb(255, 255, 255); line-height: 26px; font-style: normal; font-variant: normal; font-weight: normal; font-family: cambria, georgia, serif; color: rgb(34, 34, 34); letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-position: initial initial; background-repeat: initial initial;"><b>Bold</b></p><p style="margin: 0px; padding: 6px 0px 12px; border: 0px; outline: 0px; font-size: 18px; background-color: rgb(255, 255, 255); line-height: 26px; font-style: normal; font-variant: normal; font-weight: normal; font-family: cambria, georgia, serif; color: rgb(34, 34, 34); letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-position: initial initial; background-repeat: initial initial;"><i>Italic</i></p><p class="sub_buzz_desc" style="margin: 0px; padding: 0px 0px 12px; border: 0px; outline: 0px; font-size: 18px; background-color: rgb(255, 255, 255); line-height: 26px; font-style: normal; font-variant: normal; font-weight: normal; font-family: cambria, georgia, serif; color: rgb(34, 34, 34); letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-position: initial initial; background-repeat: initial initial;"><b><i>Bold and Italic</i></b></p><p style="margin: 0px; padding: 6px 0px 12px; border: 0px; outline: 0px; font-size: 18px; background-color: rgb(255, 255, 255); line-height: 26px; font-style: normal; font-variant: normal; font-weight: normal; font-family: cambria, georgia, serif; color: rgb(34, 34, 34); letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-position: initial initial; background-repeat: initial initial;">A<span class="Apple-converted-space"> </span><a href="http://en.wikipedia.org/wiki/Link_(The_Legend_of_Zelda)" style="margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 18px; background-color: transparent; color: rgb(0, 119, 238); text-decoration: none; background-position: initial initial; background-repeat: initial initial;">link</a>.</p>',
                output: '<p><b>Bold</b></p><p><i>Italic</i></p><p><b><i>Bold and Italic</i></b></p><p>A <a href="http://en.wikipedia.org/wiki/Link_(The_Legend_of_Zelda)">link</a>.</p>'
            },
            {
                source: 'Paragraphs with internal linebreaks',
                paste: '<meta charset=\'utf-8\'><p>One<br>Two</p><p>Three<br>Four</p>',
                output: '<p>One<br>Two</p><p>Three<br>Four</p>'
            },
            {
                source: 'Non <p> or <div> with only <br> elements',
                paste: '<p>One</p><div><h1><br /></h1></div><p>Two</p><span><span><br /></span></span><p>Three</p>',
                output: '<p>One</p><p>Two</p><p>Three</p>'
            },
            {
                source: 'Microsoft Word - line breaks',
                paste: "<p>One\nTwo\n</p>\n\n<p>Three Four</p>",
                output: '<p>One Two </p><p>Three Four</p>'
            },
            {
                source: 'Microsoft Word - Proprietary elements',
                paste: "<p>One<o:p></o:p></p><p>Two<o:p></o:p></p>",
                output: '<p>One</p><p>Two</p>'
            }
        ],
        inlineTests = [
            {
                source: 'Google docs',
                paste: '<meta charset=\'utf-8\'><meta charset="utf-8"><b style="font-weight:normal;" id="docs-internal-guid-2f060cc5-1888-a396-af95-bfb31478c7ae"><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:bold;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bold,</span><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:normal;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> </span><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:normal;font-style:italic;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">italic,</span><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:normal;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> </span><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:bold;font-style:italic;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">bold and italic</span><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:normal;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">, and </span><a href="http://en.wikipedia.org/wiki/Link_(The_Legend_of_Zelda)" style="text-decoration:none;"><span style="font-size:15px;font-family:Arial;color:#1155cc;background-color:transparent;font-weight:normal;font-style:normal;font-variant:normal;text-decoration:underline;vertical-align:baseline;white-space:pre-wrap;">a link</span></a><span style="font-size:15px;font-family:Arial;color:#000000;background-color:transparent;font-weight:normal;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></b>',
                output: "<b>Bold,</b> <i>italic,</i> <b><i>bold and italic</i></b>, and <a href=\"http://en.wikipedia.org/wiki/Link_\\(The_Legend_of_Zelda\\)\">a link</a>\\."
            },
            {
                source: 'Inside editor',
                paste: '<meta charset=\'utf-8\'><b style="color: rgb(0, 0, 0); font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px;">Bold,</b><span style="color: rgb(0, 0, 0); font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none;"> </span><i style="color: rgb(0, 0, 0); font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px;">italic,</i><span style="color: rgb(0, 0, 0); font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none;"><span class="Apple-converted-space"> </span></span><b style="color: rgb(0, 0, 0); font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px;"><i>bold and italic</i></b><span style="color: rgb(0, 0, 0); font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">, and<span class="Apple-converted-space"> </span></span><a href="http://en.wikipedia.org/wiki/Link_(The_Legend_of_Zelda)" style="color: black; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px;">a link</a><span style="color: rgb(0, 0, 0); font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 22.22222328186035px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 30px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">.</span>',
                output: "<b>Bold,</b> <i>italic,</i> <b><i>bold and italic</i></b>, and <a href=\"http://en.wikipedia.org/wiki/Link_\\(The_Legend_of_Zelda\\)\">a link</a>\\."
            }
        ];

    beforeEach(function () {
        jasmine.clock().install();
        this.el = document.createElement('div');
        this.el.className = 'editor';
        this.el.id = 'paste-editor';
        this.el.innerHTML = 'hhh';
        document.body.appendChild(this.el);
    });

    afterEach(function () {
        tearDown(this.el);
        jasmine.clock().uninstall();
    });

    describe('using cleanPastedHTML option', function () {
        it('should filter multi-line rich-text pastes', function () {
            var i,
                editorEl = this.el,
                editor = new MediumEditor('.editor', {
                    delay: 200,
                    forcePlainText: false,
                    cleanPastedHTML: true
                });

            for (i = 0; i < multiLineTests.length; i += 1) {

                // move caret to editor
                editorEl.innerHTML = '<span id="editor-inner">&nbsp</span>';

                selectElementContentsAndFire(editorEl);

                editor.cleanPaste(multiLineTests[i].paste);
                jasmine.clock().tick(100);
                expect(editorEl.innerHTML).toEqual(multiLineTests[i].output);
            }
        });

        it('should filter multi-line rich-text pastes when "insertHTML" command is not supported', function () {
            var editor = new MediumEditor('.editor', {
                forcePlainText: false,
                cleanPastedHTML: true
            });

            spyOn(document, "queryCommandSupported").and.returnValue(false);

            multiLineTests.forEach(function (test) {
                this.el.innerHTML = '<span id="editor-inner">lorem ipsum</span>';

                selectElementContentsAndFire(this.el);

                editor.cleanPaste(test.paste);
                expect(this.el.innerHTML).toEqual(test.output);
            }.bind(this));
        });

        it('should filter inline rich-text pastes', function () {
            var i,
                regex,
                editorEl = this.el,
                editor = new MediumEditor('.editor', {
                    delay: 200,
                    forcePlainText: false,
                    cleanPastedHTML: true
                });

            for (i = 0; i < inlineTests.length; i += 1) {

                // move caret to editor
                editorEl.innerHTML = 'Before&nbsp;<span id="editor-inner">&nbsp;</span>&nbsp;after.';

                selectElementContents(document.getElementById('editor-inner'));

                editor.cleanPaste(inlineTests[i].paste);
                jasmine.clock().tick(100);

                // Firefox and IE: doing an insertHTML while this <span> is selected results in the html being inserted inside of the span
                // Firefox replace the &nbsp; other either side of the <span> with a space
                // Webkit: doing an insertHTML while this <span> is selected results in the span being replaced completely
                regex = new RegExp("^Before(&nbsp;|\\s)(<span id=\"editor-inner\">)?" + inlineTests[i].output + "(</span>)?(&nbsp;|\\s)after\\.$");
                expect(regex.test(editorEl.innerHTML)).toBe(true);
            }
        });

        it('should filter inline rich-text pastes when "insertHTML" command is not supported', function () {
            var regex,
                editor = new MediumEditor('.editor', {
                    forcePlainText: false,
                    cleanPastedHTML: true
                });

            spyOn(document, "queryCommandSupported").and.returnValue(false);

            inlineTests.forEach(function (test) {
                this.el.innerHTML = 'Before&nbsp;<span id="editor-inner">&nbsp;</span>&nbsp;after.';

                selectElementContents(document.getElementById('editor-inner'));

                editor.cleanPaste(test.paste);

                // Firefox and IE: doing an insertHTML while this <span> is selected results in the html being inserted inside of the span
                // Firefox replace the &nbsp; other either side of the <span> with a space
                // Webkit: doing an insertHTML while this <span> is selected results in the span being replaced completely
                regex = new RegExp("^Before(&nbsp;|\\s)(<span id=\"editor-inner\">)?" + test.output + "(</span>)?(&nbsp;|\\s)after\\.$");
                expect(regex.test(this.el.innerHTML)).toBe(true);
            }.bind(this));
        });
    });
});
