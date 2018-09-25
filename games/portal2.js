var Portal2 = {
    directory: 'portal2',
    tickrate: 60,
    rules: [
        {
            map: 'sp_a1_intro1',
            offset: 1,
            type: 'start',
            callback: (pos, _) => {
                if (pos != undefined) {
                    let startPos = { x: -8709.20, y: 1690.07, z: 28.00 };
                    let tolerance = { x: 0.02, y: 0.02, z: 0.05 };
                    return !(Math.abs(pos.current.x - startPos.x) > tolerance.x)
                        && !(Math.abs(pos.current.y - startPos.y) > tolerance.y)
                        && !(Math.abs(pos.current.z - startPos.z) > tolerance.z);
                }
                return false;
            }
        },
        {
            map: 'e1912',
            offset: -2,
            type: 'start',
            callback: (pos, _) => {
                if (pos != undefined) {
                    let startPos = { x: -655.748779296875, y: -918.37353515625, z: -4.96875 };
                    return pos.previous.x == startPos.x
                        && pos.previous.y == startPos.y
                        && pos.previous.z == startPos.z
                        && pos.current.x != startPos.x
                        && pos.current.y != startPos.y
                        && pos.current.z != startPos.z;
                }
                return false;
            }
        },
        {
            map: undefined,
            offset: 0,
            type: 'start',
            callback: (_, cmds) => {
                if (cmds != undefined) {
                    return cmds.previous.find(cmd => cmd.startsWith('dsp_player')) != undefined
                        && cmds.current.includes('ss_force_primary_fullscreen 0');
                }
                return false;
            }
        },
        {
            map: 'mp_coop_start',
            offset: 0,
            type: 'start',
            callback: (pos, _) => {
                if (pos != undefined) {
                    let startPosBlue = { x: -9896, y: -4400, z: 3048 };
                    let startPosOrange = { x: -11168, y: -4384, z: 3040.03125 };
                    return (pos.current.x == startPosBlue.x
                        && pos.current.y == startPosBlue.y
                        && pos.current.z == startPosBlue.z)
                        || (pos.current.x == startPosOrange.x
                            && pos.current.y == startPosOrange.y
                            && pos.current.z == startPosOrange.z);
                }
                return false;
            }
        },
        {
            map: 'sp_a4_finale4',
            offset: -852,
            type: 'end',
            callback: (pos, _) => {
                if (pos != undefined) {
                    let endPos = { x: 54.1, y: 159.2, z: -201.4 };
                    let a = (pos.current.x - endPos.x) ** 2;
                    let b = (pos.current.y - endPos.y) ** 2;
                    let c = 50 ** 2;
                    return a + b < c
                        && pos.current.z < endPos.z;
                }
                return false;
            }
        },
        {
            map: undefined,
            offset: 0,
            type: 'end',
            callback: (_, cmds) => {
                if (cmds != undefined) {
                    let outroBlue = 'playvideo_end_level_transition coop_bluebot_load 2';
                    let outroOrange = 'playvideo_end_level_transition coop_orangebot_load 2';
                    return cmds.current.find(cmd => cmd.startsWith(outroBlue) || cmd.startsWith(outroOrange))
                        != undefined;
                }
                return false;
            }
        },
        {
            map: 'mp_coop_paint_longjump_intro',
            offset: 0,
            type: 'end',
            callback: (_, cmds) => {
                if (cmds != undefined) {
                    let outro = 'playvideo_exitcommand_nointerrupt coop_outro end_movie vault-movie_outro';
                    return cmds.current.includes(outro);
                }
                return false;
            }
        },
        {
            map: 'mp_coop_paint_crazy_box',
            offset: 0,
            type: 'end',
            callback: (_, cmds) => {
                if (cmds != undefined) {
                    let outro = 'playvideo_exitcommand_nointerrupt dlc1_endmovie end_movie movie_outro';
                    return cmds.current.includes(outro);
                }
                return false;
            }
        }
    ]
};

module.exports = Portal2;