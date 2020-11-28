import React, { useEffect, useState } from 'react';
import moment from 'moment'
import './guestBook.scss';
import './popup.scss';

import GuestBookService from '../services/GuestBookService';
import GuestBookType from '../types/GuestBookType';
import useAuth from '../hooks/useAuth';
import NicknameInput from './NicknameInput';
import guestBookData from '../data/guestbookData';

type GuestBookProps = {
    close: () => void;
}
function GuestBook({ close }: GuestBookProps) {

    const [guestBooks, setGuestBooks] = useState<GuestBookType[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const { auth } = useAuth();

    useEffect(() => {
        fetch();
    }, [])


    const fetch = function () {
        setGuestBooks(guestBookData)
    }

    const submit = function (text: string) {
        alert("사진전이 종료되서 방명록을 작성하실 수 없습니다.")
        // GuestBookService.create({ text })
        //     .then((res) => {
        //         setInputText("")
        //         fetch();
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //     })
    }

    const makeGuestBookList = function (guestbooks: GuestBookType[]) {
        return guestbooks.map((guestbook) => {
            return (
                <div className="guestbook-list-unit" key={guestbook.guestbook_id}>
                    <div className="guestbook-list-top left">
                        <p>{guestbook.author.nickname}</p>
                    </div>
                    <div className="guestbook-list-top right">
                        <p>{moment(guestbook.created_at).format('YYYY-MM-DD')}</p>
                    </div>
                    <div className="guestbook-list-text">
                        <p>{guestbook.text}</p>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            <div className="popup-wrp">
                <div className="popup">
                    <button className="popup-btn-close" onClick={close}>
                        <i className="ri-close-line"></i>
                    </button>
                    <h3>방 명 록</h3>
                    <div className="guestbook-body">
                        <div className="guestbook-list">
                            {makeGuestBookList(guestBooks)}
                        </div>
                    </div>
                    <div className="guestbook-write">
                        <textarea onChange={(e) => setInputText(e.target.value)} value={inputText} />
                        <button onClick={() => submit(inputText)}>ENTER</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default GuestBook;
