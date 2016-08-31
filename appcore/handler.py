# coding: utf-8

import tornado.web
import tornado.gen
import json

import sudokuer

class IndexHandler(tornado.web.RequestHandler):

    def get(self):
        self.render('sudoku.html')


class SolutionHandler(tornado.web.RequestHandler):

    @tornado.gen.coroutine
    def post(self):
        puzzle = self.get_body_argument('puzzle')
        puzzle = json.loads(puzzle)
        res = yield sudokuer.solve(puzzle)
        #eno = res['eno']
        self.set_header('Content-Type', 'application/json')
        self.write(json.dumps(res))


