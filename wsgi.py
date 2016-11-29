#!/usr/bin/env python
# coding: utf8

import tornado.web
import tornado.wsgi

from appcore import handler

class SudokuApp(tornado.web.Application):
    def __init__(self):
        handlers = [
            tornado.web.url(r"/", handler.IndexHandler, name='main_index'),
            tornado.web.url(r"/api/solve", handler.SolutionHandler),
        ]
        settings = {
            #'cookie_secret': '8ktx7c118bu=g!n*x@0v_n9!2(=pz-&20@2yyn^y1d=v9*wu0',
            'template_path': "/usr/local/var/www/html",
            'static_path': "/usr/local/var/www/static",
            #'autoreload': True,
            'xsrf': True,
            'debug': False,
        }
        super(SudokuApp, self).__init__(handlers, **settings)

def application(environ, start_response):
    app = SudokuApp()
    wsgi_app = tornado.wsgi.WSGIAdapter(app)
    return wsgi_app(environ, start_response)
