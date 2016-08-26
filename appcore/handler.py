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
        res = {}
        solution = yield sudokuer.solve(puzzle)
        #solution = sudokuer.solve(puzzle)
        #if isinstance(solution, Exception):
        if solution is None:
            res['eno'] = 1
        else:
            res['eno'] = 0
        res['solution'] = solution
        self.set_header('Content-Type', 'application/json')
        self.write(json.dumps(res))

