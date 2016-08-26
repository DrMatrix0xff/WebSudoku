#!/usr/bin/env python
# coding: utf8

import os
import tornado.ioloop
import tornado.options
import tornado.httpserver
import tornado.web

from appcore import handler


class SudokuApp(tornado.web.Application):
    def __init__(self):
        handlers = [
            tornado.web.url(r"/", handler.IndexHandler, name='main_index'),
            tornado.web.url(r"/api/solve", handler.SolutionHandler),
            #tornado.web.url(r"/logout/", handler.LogoutHandler, name='sign_out'),
        ]
        settings = {
            #'cookie_secret': '8ktx7c118bu=g!n*x@0v_n9!2(=pz-&20@2+^n^y1d=v9*wu0',
            'template_path': os.path.join(os.path.dirname(os.path.abspath(__file__)), "templates"),
            'static_path': os.path.join(os.path.dirname(os.path.abspath(__file__)), "static"),
            #'login_url': '/login/',
            'autoreload': True,
            'xsrf': True,
            'debug': False,
        }
        super(SudokuApp, self).__init__(handlers, **settings)

def main():
    tornado.options.parse_command_line()
    app = SudokuApp()
    httpd = tornado.httpserver.HTTPServer(app)
    httpd.listen(9981, address='localhost')
    #httpd.listen(9981, address='*')
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()


