# coding: utf-8

#import traceback
import tornado.concurrent
import sudoku

def solve(puzzle):
    f = tornado.concurrent.Future()
    try:
        solution = sudoku.solve(puzzle)
        f.set_result(solution)
    except Exception as e:
        #traceback.print_exc()
        f.set_result(None)
    return f

if __name__ == '__main__':
    import tornado.ioloop
    from tornado import gen
    ev_loop = tornado.ioloop.IOLoop.instance().current()

    p = [
        0,0,3, 0,0,0, 0,0,0,
        0,0,0, 0,0,0, 0,0,0,
        1,0,0, 0,0,0, 0,0,0,
        0,0,0, 0,0,0, 0,0,0,
        0,0,0, 0,0,0, 0,0,0,
        0,0,0, 0,0,0, 0,0,0,
        0,0,0, 0,0,0, 0,0,0,
        0,0,0, 0,0,0, 0,0,0,
        0,0,0, 0,0,0, 0,0,0,
    ]

    @gen.coroutine
    def test_solve():
        result = yield solve(p)
        print result

    ev_loop.run_sync(test_solve)
    ev_loop.close(all_fds=True)

